package user

import (
	"account/internal/account/api"
	"account/internal/account/repository"
	"account/internal/account/repository/base"
	"errors"
	"log"
)

type Client interface {
	CreateUser(req RegisterRequest) error
	UpdatePassword(req UserPassword) error
}

type clientImpl struct {
	userRepo            *base.Repository[*User]
	institutionUserRepo *base.Repository[*InstitutionUser]
	studentRepo         *base.Repository[*Student]
	userPassword        *base.Repository[*UserPassword]
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
	}
}
