package account

import (
	"account/internal/account/repository/institution"
	"account/internal/account/repository/user"
)

type Service interface {
	Login(req LoginRequest) (*LoginResponse, error)
	UserRegister(req user.RegisterRequest) error
	UpdatePassword(req UpdatePasswordRequest) error
	SendOTP(req SendOTPRequest) error
	CheckOTP(req CheckOTPRequest) error
}

type service struct {
	institutionClient institution.Client
}

func (s *service) Login(req LoginRequest) (*LoginResponse, error) {
	return &LoginResponse{}, nil
}

func (s *service) UserRegister(req user.RegisterRequest) error {
	err := req.Validate()
	if err != nil {
		return user.NewValidationError(err)
	}

	err = s.institutionClient.CheckInstitution(institution.CheckInstitutionRequest{
		InstitutionName: req.InstitutionUser.InstitutionName,
		Email:           req.User.Email,
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *service) UpdatePassword(req UpdatePasswordRequest) error {
	return nil
}

func (s *service) SendOTP(req SendOTPRequest) error {
	return nil
}

func (s *service) CheckOTP(req CheckOTPRequest) error {
	return nil
}

type NewServiceRequest struct {
	InstitutionClient institution.Client
}

func NewService(req NewServiceRequest) Service {
	return &service{
		institutionClient: req.InstitutionClient,
	}
}
