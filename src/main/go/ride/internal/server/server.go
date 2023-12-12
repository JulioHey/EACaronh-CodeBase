package server

import (
	"github.com/gin-gonic/gin"
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

	err := s.service.AcceptRideRequest(userId, rideId)
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

func NewServer() Server {
	return &server{
		service: ride.NewService(),
	}
}

func (s *server) Bind(r *gin.Engine) {
	r.POST("/car", middlewares.TokenHandler(), s.CreateCar)
	r.POST("/ride", middlewares.TokenHandler(), s.CreateRide)
	r.POST("/ride/:id", middlewares.TokenHandler(), s.CreateRideRequest)
	r.PUT("/riderequest/:id/renounce", middlewares.TokenHandler(), s.RenounceRideRequest)
	r.PUT("/riderequest/:id/accept", middlewares.TokenHandler(), s.AcceptRideRequest)
	r.PUT("/riderequest/:id/decline", middlewares.TokenHandler(), s.DeclineRideRequest)
}
