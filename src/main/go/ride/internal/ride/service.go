package ride

import (
	"ride/internal/ride/api"
	"ride/internal/ride/repository/base"
)

type Service interface {
	CreateCar(car *Car) error
}

type service struct {
	carRepo *base.Repository[Car]
}

func (s *service) CreateCar(car *Car) error {
	validationErr := car.Validate()
	if validationErr != nil {
		return NewValidationError(validationErr)
	}

	_, err := s.carRepo.Create(*car)
	if err != nil {
		return err
	}
	return nil
}

func NewService() Service {
	return &service{
		carRepo: &base.Repository[Car]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: Car{},
		},
	}
}
