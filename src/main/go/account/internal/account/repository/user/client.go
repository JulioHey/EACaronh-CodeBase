package user

import (
	"account/internal/account/api"
	"account/internal/account/repository"
	"account/internal/account/repository/base"
	"errors"
	"fmt"
	"log"
	"math/rand"
	"time"
)

type Client interface {
	CreateUser(req RegisterRequest) error
	UpdatePassword(req UserPassword) error
	SendOTP(req SendOTPRequest) (*OTPCode, error)

	GetUserByEmail(email string) (*User, error)
	TryDeleteOTP(ID string) error
	CheckOTP(userID, code string) error
	Login(email, password string) (*User, error)
}

type clientImpl struct {
	userRepo            *base.Repository[*User]
	institutionUserRepo *base.Repository[*InstitutionUser]
	studentRepo         *base.Repository[*Student]
	userPassword        *base.Repository[*UserPassword]
	otpCode             *base.Repository[*OTPCode]
}

func (c *clientImpl) CreateUser(req RegisterRequest) error {
	if err := c.checkRepo(); err != nil {
		return err
	}
	user, err := c.userRepo.Create(req.User)
	if err != nil {
		return err
	}
	institutionUser := &InstitutionUser{
		InstitutionID:      req.Institution.ID,
		UserID:             (*user).ID,
		RegistrationNumber: req.InstitutionUser.RegistrationNumber,
	}
	institutionUserPointer, err := c.institutionUserRepo.Create(institutionUser)
	if err != nil {
		return err
	}
	student := req.InstitutionUser.StudentUser
	student.InstitutionUserID = (*institutionUserPointer).ID
	_, err = c.studentRepo.Create(student)
	if err != nil {
		return err
	}

	return nil
}

func (c *clientImpl) UpdatePassword(req UserPassword) error {
	if err := c.checkRepo(); err != nil {
		return err
	}
	query := []repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{req.UserID},
		},
	}
	userPasswords, err := c.userPassword.Get(query)
	if err != nil {
		return err
	}
	if len(userPasswords) == 0 {
		log.Printf("DALE DELE")
		_, err = c.userPassword.Create(&UserPassword{
			UserID:   req.UserID,
			Password: req.Password,
		})

		if err != nil {
			return err
		}
		return nil
	} else {
		userPasswords[0].Password = req.Password
		_, err = c.userPassword.Update(userPasswords[0].ID, userPasswords[0])
		if err != nil {
			return err
		}
		return nil
	}
}

func (c *clientImpl) SendOTP(req SendOTPRequest) (*OTPCode, error) {
	codes, err := c.otpCode.Get([]repository.Query{
		{
			Field:     "email",
			Operation: repository.EQUAL,
			Targets:   []string{req.Email},
		},
	})

	if err != nil {
		return nil, err
	}
	var otpCode *OTPCode

	if len(codes) == 0 {
		otpCode = &OTPCode{
			Email: req.Email,
		}
		otpCode.Code = generateCode()
		newCode, err := c.otpCode.Create(otpCode)
		if err != nil {
			return nil, err
		}
		otpCode = *newCode
	} else {
		otpCode = codes[0]
		otpCode.Code = generateCode()
		_, err = c.otpCode.Update(otpCode.ID, otpCode)
		if err != nil {
			return nil, err
		}
	}

	return otpCode, nil
}

func (c *clientImpl) GetUserByEmail(email string) (*User, error) {
	users, err := c.userRepo.Get([]repository.Query{
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

func (c *clientImpl) TryDeleteOTP(ID string) error {
	otpCode, err := c.otpCode.GetByID(ID)
	if err != nil {
		return err
	}
	err = c.otpCode.Delete((*otpCode).ID)
	if err != nil {
		return err
	}
	return nil
}

func (c *clientImpl) CheckOTP(email, code string) error {
	otpCodes, err := c.otpCode.Get([]repository.Query{
		{
			Field:     "email",
			Operation: repository.EQUAL,
			Targets:   []string{email},
		},
	})
	if err != nil {
		return err
	}
	if len(otpCodes) == 0 {
		return errors.New("code not found")
	}
	otpCode := otpCodes[0]
	if otpCode.Code != code {
		return errors.New("wrong code")
	}
	return nil
}

func (c *clientImpl) Login(email, password string) (*User, error) {
	user, err := c.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}

	passowrd, err := c.userPassword.Get([]repository.Query{
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

	if passowrd[0].Password != password {
		return nil, errors.New("wrong password")
	}

	return user, nil
}

func generateCode() string {
	code := ""
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < 4; i++ {
		code += fmt.Sprintf("%d", rand.Intn(9-0+1))
	}
	return code
}

func (c *clientImpl) checkRepo() error {
	if c.userRepo == nil {
		return errors.New("user repo is nil")
	}
	if c.institutionUserRepo == nil {
		return errors.New("institution user repo is nil")
	}
	if c.studentRepo == nil {
		return errors.New("student repo is nil")
	}
	return nil
}

func NewUserClient(repoURL string) Client {
	return &clientImpl{
		userRepo: &base.Repository[*User]{
			Url:    repoURL,
			Client: api.NewHTTPClient(),
			Entity: &User{},
		},
		institutionUserRepo: &base.Repository[*InstitutionUser]{
			Url:    repoURL,
			Client: api.NewHTTPClient(),
			Entity: &InstitutionUser{},
		},
		studentRepo: &base.Repository[*Student]{
			Url:    repoURL,
			Client: api.NewHTTPClient(),
			Entity: &Student{},
		},
		userPassword: &base.Repository[*UserPassword]{
			Url:    repoURL,
			Client: api.NewHTTPClient(),
			Entity: &UserPassword{},
		},
		otpCode: &base.Repository[*OTPCode]{
			Url:    repoURL,
			Client: api.NewHTTPClient(),
			Entity: &OTPCode{},
		},
	}
}
