package ride

import (
	"errors"
	"ride/internal/ride/api"
	"ride/internal/ride/repository"
	"ride/internal/ride/repository/base"
)

type Service interface {
	CreateCar(car *Car) (*Car, error)
	CreateRide(ride CreateRideRequest) (*Ride, error)
	CreateRideRequest(rideRequest *RequestRide) (*RideRequest, error)
	RenounceRideRequest(userID, rideRequestID string) error
	AcceptRideRequest(userID, rideRequestID string) error
	DeclineRideRequest(userID, rideRequestID string) error
}

type service struct {
	carRepo         *base.Repository[Car]
	rideRepo        *base.Repository[Ride]
	addressRepo     *base.Repository[Address]
	rideRequestRepo *base.Repository[RideRequest]
}

func (s *service) CreateCar(car *Car) (*Car, error) {
	err := car.Validate()
	if err != nil {
		return nil, NewValidationError(err)
	}

	newCar, err := s.carRepo.Create(*car)
	if err != nil {
		return nil, err
	}
	return newCar, nil
}

func (s *service) CreateRide(ride CreateRideRequest) (*Ride, error) {
	err := ride.Validate()
	if err != nil {
		return nil, NewValidationError(err)
	}
	cars, err := s.carRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{ride.Ride.UserID},
		},
		{
			Field:     "id",
			Operation: repository.EQUAL,
			Targets:   []string{ride.Ride.CarID},
		},
	})

	if err != nil {
		return nil, err
	}

	if len(cars) == 0 {
		return nil, NewValidationError(errors.New("car not found"))
	}

	toAddress, err := s.addressRepo.Create(ride.ToAddress)
	if err != nil {
		return nil, err
	}
	fromAddress, err := s.addressRepo.Create(ride.FromAddress)
	if err != nil {
		return nil, err
	}

	ride.Ride.ToAddressID = toAddress.ID
	ride.Ride.FromAddressID = fromAddress.ID

	newRide, err := s.rideRepo.Create(ride.Ride)
	if err != nil {
		return nil, err
	}

	return newRide, nil
}

func (s *service) CreateRideRequest(rideRequest *RequestRide) (*RideRequest, error) {
	err := rideRequest.Validate()
	if err != nil {
		return nil, NewValidationError(err)
	}

	res, err := s.rideRequestRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{rideRequest.UserID},
		},
		{
			Field:     "ride_id",
			Operation: repository.EQUAL,
			Targets:   []string{rideRequest.RideID},
		},
	})

	if err != nil {
		return nil, err
	}

	if len(res) > 0 {
		return nil, NewValidationError(errors.New("ride request already exists"))
	}

	address, err := s.addressRepo.Create(rideRequest.Address)
	if err != nil {
		return nil, err
	}

	rideReq := &RideRequest{
		UserID:    rideRequest.UserID,
		RideID:    rideRequest.RideID,
		AddressID: address.ID,
		Status:    "REQUESTED",
	}

	rideReq, err = s.rideRequestRepo.Create(*rideReq)
	if err != nil {
		return nil, err
	}

	return rideReq, nil
}

func (s *service) RenounceRideRequest(userID, rideRequestID string) error {
	rideRequest, err := s.rideRequestRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
		{
			Field:     "id",
			Operation: repository.EQUAL,
			Targets:   []string{rideRequestID},
		},
	})

	if err != nil {
		return err
	}

	if len(rideRequest) == 0 {
		return NewValidationError(errors.New("ride request not found"))
	}

	if rideRequest[0].Status == "DECLINED" {
		return NewValidationError(errors.New("ride request already declined"))
	}

	_, err = s.rideRequestRepo.Update(rideRequestID, RideRequest{
		Status: "RENOUNCED",
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *service) AcceptRideRequest(userID, rideRequestID string) error {
	rideRequest, err := s.rideRequestRepo.GetByID(rideRequestID)
	if err != nil {
		return err
	}
	rides, err := s.rideRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
		{
			Field:     "id",
			Operation: repository.EQUAL,
			Targets:   []string{rideRequest.RideID},
		},
	})

	if err != nil {
		return err
	}

	if len(rides) == 0 {
		return NewValidationError(errors.New("ride is not owned by user"))
	}

	_, err = s.rideRequestRepo.Update(rideRequestID, RideRequest{
		Status: "DECLINED",
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *service) DeclineRideRequest(userID, rideRequestID string) error {
	rideRequest, err := s.rideRequestRepo.GetByID(rideRequestID)
	if err != nil {
		return err
	}
	rides, err := s.rideRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
		{
			Field:     "id",
			Operation: repository.EQUAL,
			Targets:   []string{rideRequest.RideID},
		},
	})

	if err != nil {
		return err
	}

	if len(rides) == 0 {
		return NewValidationError(errors.New("ride is not owned by user"))
	}

	_, err = s.rideRequestRepo.Update(rideRequestID, RideRequest{
		Status: "ACCEPTED",
	})

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
		rideRepo: &base.Repository[Ride]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: Ride{},
		},
		addressRepo: &base.Repository[Address]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: Address{},
		},
		rideRequestRepo: &base.Repository[RideRequest]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: RideRequest{},
		},
	}
}
