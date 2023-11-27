package account

import (
	"account/internal/account/api"
	"account/internal/account/email"
	"account/internal/account/repository"
	"account/internal/account/repository/base"
	"errors"
	"fmt"
	"github.com/golang-jwt/jwt"
	"log"
	"math/rand"
	"strings"
	"time"
)

type Service interface {
	Login(req LoginRequest) (*LoginResponse, error)
	UserRegister(req RegisterRequest) error
	UpdatePassword(req UpdatePasswordRequest) error
	SendOTP(req SendOTPRequest) error
	CheckOTP(req CheckOTPRequest) error
}

type service struct {
	institutionRepo     *base.Repository[*Institution]
	userRepo            *base.Repository[*User]
	institutionUserRepo *base.Repository[*InstitutionUser]
	studentRepo         *base.Repository[*Student]
	userPassword        *base.Repository[*UserPassword]
	otpCode             *base.Repository[*OTPCode]
}

func (s *service) Login(req LoginRequest) (*LoginResponse, error) {
	user, err := s.getUserByEmail(req.Email)
	if err != nil {
		return nil, err
	}

	passowrd, err := s.userPassword.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{user.ID},
		},
	})
	if err != nil {
		return nil, err
	}

	if len(passowrd) == 0 {
		return nil, errors.New("password not found")
	}

	if passowrd[0].Password != req.Password {
		return nil, errors.New("wrong password")
	}

	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["user_id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return nil, err
	}
	return &LoginResponse{
		Token: tokenString,
	}, nil
}

func (s *service) UserRegister(req RegisterRequest) error {
	err := req.Validate()
	if err != nil {
		return NewValidationError(err)
	}

	institutions, err := s.institutionRepo.Get([]repository.Query{
		{
			Field:     "name",
			Operation: repository.EQUAL,
			Targets:   []string{req.InstitutionUser.InstitutionName},
		},
	})

	if err != nil {
		return err
	}

	if len(institutions) == 0 {
		return errors.New("institution not found")
	}
	institution := institutions[0]

	if err != nil {
		return err
	}

	splittedEmail := strings.Split(req.User.Email, "@")[1]

	if splittedEmail != institution.Domain {
		log.Printf("email %s is not valid for institution %s", req.User.Email,
			institution.Domain)
		return errors.New("email is not valid")
	}

	if err != nil {
		return err
	}
	req.Institution = &Institution{
		ID:   institution.ID,
		Name: req.InstitutionUser.InstitutionName,
	}

	user, err := s.userRepo.Create(req.User)
	if err != nil {
		return err
	}
	institutionUser := &InstitutionUser{
		InstitutionID:      institution.ID,
		UserID:             (*user).ID,
		RegistrationNumber: req.InstitutionUser.RegistrationNumber,
	}
	institutionUserPointer, err := s.institutionUserRepo.Create(institutionUser)
	if err != nil {
		return err
	}
	student := req.InstitutionUser.StudentUser
	student.InstitutionUserID = (*institutionUserPointer).ID
	_, err = s.studentRepo.Create(student)
	if err != nil {
		return err
	}

	return nil

	if err != nil {
		return err
	}

	return nil
}

func (s *service) UpdatePassword(req UpdatePasswordRequest) error {
	query := []repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{req.UserID},
		},
	}
	userPasswords, err := s.userPassword.Get(query)
	if err != nil {
		return err
	}
	if len(userPasswords) == 0 {
		log.Printf("DALE DELE")
		_, err = s.userPassword.Create(&UserPassword{
			UserID:   req.UserID,
			Password: req.Password,
		})

		if err != nil {
			return err
		}
		return nil
	} else {
		userPasswords[0].Password = req.Password
		_, err = s.userPassword.Update(userPasswords[0].ID, userPasswords[0])
		if err != nil {
			return err
		}
		return nil
	}
	return nil
}

func (s *service) SendOTP(req SendOTPRequest) error {
	codes, err := s.otpCode.Get([]repository.Query{
		{
			Field:     "email",
			Operation: repository.EQUAL,
			Targets:   []string{req.Email},
		},
	})

	if err != nil {
		return err
	}
	var otpCode *OTPCode

	if len(codes) == 0 {
		otpCode = &OTPCode{
			Email: req.Email,
		}
		otpCode.Code = generateCode()
		newCode, err := s.otpCode.Create(otpCode)
		if err != nil {
			return err
		}
		otpCode = *newCode
	} else {
		otpCode = codes[0]
		otpCode.Code = generateCode()
		_, err = s.otpCode.Update(otpCode.ID, otpCode)
		if err != nil {
			return err
		}
	}

	if err != nil {
		return err
	}

	err = email.SentOTPEmail(req.Email, otpCode.Code)
	if err != nil {
		return err
	}
	MyTimer := time.NewTimer(300 * time.Second)

	go func() {
		// Notification recived when timer gets in-activated.
		<-MyTimer.C
		otpCodePointer, err := s.otpCode.GetByID(otpCode.ID)
		if err != nil {
			log.Printf("Error while deleting OTP: %v", err)
		}
		err = s.otpCode.Delete((*otpCodePointer).ID)
		if err != nil {
			log.Printf("Error while deleting OTP: %v", err)
		}
	}()
	return nil
}

func (s *service) CheckOTP(req CheckOTPRequest) error {
	otpCodes, err := s.otpCode.Get([]repository.Query{
		{
			Field:     "email",
			Operation: repository.EQUAL,
			Targets:   []string{req.Email},
		},
	})
	if err != nil {
		return err
	}
	if len(otpCodes) == 0 {
		return errors.New("code not found")
	}
	otpCode := otpCodes[0]
	if otpCode.Code != req.Code {
		return errors.New("wrong code")
	}
	return nil
}

func (s *service) getUserByEmail(email string) (*User, error) {
	users, err := s.userRepo.Get([]repository.Query{
		{
			Field:     "email",
			Operation: repository.EQUAL,
			Targets:   []string{email},
		},
	})

	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, errors.New("user not found")
	}
	return users[0], nil
}
func generateCode() string {
	code := ""
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < 4; i++ {
		code += fmt.Sprintf("%d", rand.Intn(9-0+1))
	}
	return code
}

type NewServiceRequest struct {
	RepoURL string
}

func NewService(req NewServiceRequest) Service {
	return &service{
		institutionRepo: &base.Repository[*Institution]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &Institution{},
		},
		userRepo: &base.Repository[*User]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &User{},
		},
		institutionUserRepo: &base.Repository[*InstitutionUser]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &InstitutionUser{},
		},
		studentRepo: &base.Repository[*Student]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &Student{},
		},
		userPassword: &base.Repository[*UserPassword]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &UserPassword{},
		},
		otpCode: &base.Repository[*OTPCode]{
			Url:    req.RepoURL,
			Client: api.NewHTTPClient(),
			Entity: &OTPCode{},
		},
	}
}
