package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"ride/internal/ride"
)

type Server interface {
	CreateCar(c *gin.Context)
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

	err = s.service.CreateCar(&car)
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
	r.POST("/car", s.CreateCar)
}
