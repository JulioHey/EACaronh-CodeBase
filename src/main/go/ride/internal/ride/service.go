package ride

import (
	"errors"
	"log"
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
	GetRides(request GetRideRequest) (*GetRideResponse, error)
	GetRideRequests(req GetRideRequestRequest) (*GetRideRequestResponse, error)
	GetCarsFromUser(userID string) ([]Car, error)
	GetRidesFromUser(userID string) ([]Ride, error)
	GetRideRequestsByRide(rideID string) ([]RideRequest, error)
	GetParticipantsByRide(rideID string) ([]User, error)
}

type service struct {
	carRepo         *base.Repository[Car]
	rideRepo        *base.Repository[Ride]
	addressRepo     *base.Repository[Address]
	rideRequestRepo *base.Repository[RideRequest]
	ridePathRepo    *base.Repository[RidePath]
	userRepo        *base.Repository[User]
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
		log.Printf("Deu erro de validação %v", err)
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
	log.Printf("cars: %v", cars)
	if err != nil {
		return nil, err
	}

	if len(cars) == 0 {
		return nil, NewValidationError(errors.New("car not found"))
	}

	newRide, err := s.rideRepo.Create(ride.Ride)
	if err != nil {
		return nil, err
	}
	log.Printf("newRide: %v", newRide)

	_, err = s.ridePathRepo.Create(RidePath{
		RideID:    newRide.ID,
		ToAddress: ride.Ride.ToAddress,
		From:      ride.Ride.FromAddress,
		RideDate:  ride.Ride.Date,
	})
  
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

	//
	//res, err := s.rideRequestRepo.Get([]repository.Query{
	//	{
	//		Field:     "user_id",
	//		Operation: repository.EQUAL,
	//		Targets:   []string{rideRequest.UserID},
	//	},
	//	{
	//		Field:     "ride_id",
	//		Operation: repository.EQUAL,
	//		Targets:   []string{rideRequest.RideID},
	//	},
	//})

	if err != nil {
		return nil, err
	}


	//if len(res) > 0 {
	//	return nil, NewValidationError(errors.New("ride request already exists"))
	//}

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
		Status: "ACCEPTED",
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
		Status: "DECLINED",
	})

	if err != nil {
		return err
	}

	return nil
}

func (s *service) GetRides(request GetRideRequest) (*GetRideResponse, error) {
	if request.Date == "" || request.To == "" {
		return nil, NewValidationError(errors.New(
			"date and to params are required"))
	}

	ridePaths, err := s.ridePathRepo.Get([]repository.Query{
		{
			Field:     "ride_date",
			Operation: repository.EQUAL,
			Targets:   []string{request.Date},
		},
		{
			Field:     "to_address",
			Operation: repository.EQUAL,
			Targets:   []string{request.To},
		},
	})

	if err != nil {
		log.Printf("Error getting ride paths: %v", err)
		return nil, err
	}

	if len(ridePaths) == 0 {
		return nil, errors.New("ride path not found")
	}

	var rideIds []string

	for _, ridePath := range ridePaths {
		rideIds = append(rideIds, ridePath.RideID)
	}

	rides, err := s.rideRepo.Get([]repository.Query{
		{
			Field:     "id",
			Operation: repository.IN,
			Targets:   rideIds,
		},
	})

	if err != nil {
		log.Printf("Error getting rides: %v", err)
		return nil, err
	}

	return &GetRideResponse{
		Rides: rides,
	}, nil
}

func (s *service) GetRideRequests(req GetRideRequestRequest) (*GetRideRequestResponse, error) {
	if req.UserID == "" {
		return nil, NewValidationError(errors.New(
			"ride_id and user_id params are required"))
	}

	rideRequests, err := s.rideRequestRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{req.UserID},
		},
	})

	if err != nil {
		return nil, err
	}
	rideReqRes := []RideRequestComplete{}
	for _, rideReq := range rideRequests {
		rideReqComplete := RideRequestComplete{
			ID:        rideReq.ID,
			UserID:    rideReq.UserID,
			RideID:    rideReq.UserID,
			AddressID: rideReq.AddressID,
			Status:    rideReq.Status,
			Driver:    User{},
			Ride:      Ride{},
		}
		ride, err := s.rideRepo.GetByID(rideReq.RideID)
		if err != nil {
			continue
		}
		rideReqComplete.Ride = *ride
		user, err := s.userRepo.GetByID(rideReq.UserID)
		if err != nil {
			continue
		}
		rideReqComplete.Driver = *user
		rideReqRes = append(rideReqRes, rideReqComplete)
	}

	return &GetRideRequestResponse{
		RideRequests: rideReqRes,
	}, nil
}

func (s *service) GetCarsFromUser(userID string) ([]Car, error) {
	return s.carRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
	})
}

func (s *service) GetRidesFromUser(userID string) ([]Ride, error) {
	return s.rideRepo.Get([]repository.Query{
		{
			Field:     "user_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
	})
}

func (s *service) GetRideRequestsByRide(rideId string) ([]RideRequest, error) {
	return s.rideRequestRepo.Get([]repository.Query{
		{
			Field:     "ride_id",
			Operation: repository.EQUAL,
			Targets:   []string{rideId},
		},
		{
			Field:     "status",
			Operation: repository.EQUAL,
			Targets:   []string{"REQUESTED"},
		},
	})
}

func (s *service) GetParticipantsByRide(rideId string) ([]User, error) {
	log.Printf("Getting participants by ride: %v", rideId)
	requests, err := s.rideRequestRepo.Get([]repository.Query{
		{
			Field:     "ride_id",
			Operation: repository.EQUAL,
			Targets:   []string{rideId},
		},
		{
			Field:     "status",
			Operation: repository.EQUAL,
			Targets:   []string{"ACCEPTED"},
		},
	})

	if err != nil {
		return nil, err
	}

	usersIds := []string{}

	for _, request := range requests {
		usersIds = append(usersIds, request.UserID)
	}

	return s.userRepo.Get([]repository.Query{
		{
			Field:     "id",
			Operation: repository.IN,
			Targets:   usersIds,
		},
	})
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

		ridePathRepo: &base.Repository[RidePath]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: RidePath{},
		},
		userRepo: &base.Repository[User]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: User{},
		},
	}
}
