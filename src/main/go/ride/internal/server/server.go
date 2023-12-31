package server

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"ride/internal/middlewares"
	"ride/internal/ride"
)

type Server interface {
	CreateCar(c *gin.Context)
	CreateRide(c *gin.Context)
	CreateRideRequest(c *gin.Context)
	RenounceRideRequest(c *gin.Context)
	AcceptRideRequest(c *gin.Context)
	DeclineRideRequest(c *gin.Context)
	GetRides(c *gin.Context)
	GetRideRequests(c *gin.Context)
	GetCarsFromUser(c *gin.Context)
	GetRidesFromUser(c *gin.Context)
	GetRideRequestsByRide(c *gin.Context)
	GetParticipantsByRide(c *gin.Context)
	Bind(r *gin.Engine)
}

type server struct {
	service ride.Service
}

func (s *server) CreateCar(c *gin.Context) {
	var car ride.Car
	err := c.BindJSON(&car)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	userID := c.Query("user_id")
  car.UserID = userID

	newCar, err := s.service.CreateCar(&car)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newCar)
}

func (s *server) CreateRide(c *gin.Context) {
	var ride ride.CreateRideRequest
	err := c.BindJSON(&ride)
	if err != nil {
		log.Printf("Error while binding JSON: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}
	ride.Ride.UserID = userID

	newRide, err := s.service.CreateRide(ride)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newRide)
}

func (s *server) CreateRideRequest(c *gin.Context) {
	var rideRequest ride.RequestRide
	err := c.BindJSON(&rideRequest)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	rideRequest.UserID = c.Query("user_id")
	rideRequest.RideID = c.Param("id")

	newRideReq, err := s.service.CreateRideRequest(&rideRequest)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newRideReq)
}

func (s *server) RenounceRideRequest(c *gin.Context) {
	rideId := c.Param("id")
	userId := c.Query("user_id")

	if rideId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ride id is required"})
		return
	}

	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}

	err := s.service.RenounceRideRequest(userId, rideId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) AcceptRideRequest(c *gin.Context) {
	rideRequestID := c.Param("id")
	userId := c.Query("user_id")

	if rideRequestID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ride id is required"})
		return
	}

	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}


	err := s.service.AcceptRideRequest(userId, rideRequestID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})

}

func (s *server) DeclineRideRequest(c *gin.Context) {
	rideId := c.Param("id")
	userId := c.Query("user_id")

	if rideId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ride id is required"})
		return
	}

	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}

	err := s.service.DeclineRideRequest(userId, rideId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) GetRides(c *gin.Context) {
	getRideReq := &ride.GetRideRequest{}
	getRideReq.Date = c.Query("date")
	getRideReq.To = c.Query("to")

	rides, err := s.service.GetRides(*getRideReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, rides)
}

func (s *server) GetRideRequests(c *gin.Context) {
	getRideRequestReq := &ride.GetRideRequestRequest{}
	getRideRequestReq.UserID = c.Query("user_id")

	rideRequests, err := s.service.GetRideRequests(*getRideRequestReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"ride_requests": rideRequests,
	})
}

func (s *server) GetCarsFromUser(c *gin.Context) {
	userID := c.Query("user_id")

	cars, err := s.service.GetCarsFromUser(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"cars": cars,
	})
}

func (s *server) GetRidesFromUser(c *gin.Context) {
	userID := c.Query("user_id")

	rides, err := s.service.GetRidesFromUser(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"rides": rides,
	})
}

func (s *server) GetRideRequestsByRide(c *gin.Context) {
	rideId := c.Param("id")

	rides, err := s.service.GetRideRequestsByRide(rideId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"ride_requests": rides,
	})
}

func (s *server) GetParticipantsByRide(c *gin.Context) {
	rideId := c.Param("id")

	users, err := s.service.GetParticipantsByRide(rideId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"participants": users,
	})
}

func NewServer() Server {
	return &server{
		service: ride.NewService(),
	}
}

func (s *server) Bind(r *gin.Engine) {
	r.POST("/car", middlewares.TokenHandler(), s.CreateCar)
	r.GET("/car", middlewares.TokenHandler(), s.GetCarsFromUser)
	r.POST("/ride", middlewares.TokenHandler(), s.CreateRide)
	r.GET("/ride", middlewares.TokenHandler(), s.GetRides)
	r.GET("/ride/user", middlewares.TokenHandler(), s.GetRidesFromUser)
	r.POST("/ride/:id", middlewares.TokenHandler(), s.CreateRideRequest)
	r.GET("/ride/:id/participants", middlewares.TokenHandler(),
		s.GetParticipantsByRide)
	r.GET("/ride/:id/request", middlewares.TokenHandler(), s.GetRideRequestsByRide)
	r.GET("/riderequest", middlewares.TokenHandler(), s.GetRideRequests)
	r.PUT("/riderequest/:id/renounce", middlewares.TokenHandler(), s.RenounceRideRequest)
	r.PUT("/riderequest/:id/accept", middlewares.TokenHandler(), s.AcceptRideRequest)
	r.PUT("/riderequest/:id/decline", middlewares.TokenHandler(), s.DeclineRideRequest)
}
