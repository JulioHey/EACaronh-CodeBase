package server

import (
	"account/internal/account"
	"account/internal/account/repository/user"
	"errors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type Server interface {
	Login(c *gin.Context)
	UserRegister(c *gin.Context)
	UpdatePassword(c *gin.Context)
	SendOTP(c *gin.Context)
	CheckOTP(c *gin.Context)
	Bind(r *gin.Engine)
}

type server struct {
	service account.Service
}

func (s *server) Login(c *gin.Context) {
	var req account.LoginRequest

	c.BindJSON(&req)

	log.Printf("username: %s, password: %s", req.Email, req.Password)

	s.service.Login(req)

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) UserRegister(c *gin.Context) {
	var req user.RegisterRequest

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Received user register request: %v", req)

	err = s.service.UserRegister(req)

	if err != nil {
		var validationError *user.ValidationError
		if errors.As(err, &validationError) {
			log.Printf("validation error: %v", err.Error())
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "validation error"})
			return
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"Internal service error": err.
				Error()})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
	return
}

func (s *server) UpdatePassword(c *gin.Context) {
	var req account.UpdatePasswordRequest

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	err = s.service.UpdatePassword(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Internal service error": err.
			Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) SendOTP(c *gin.Context) {
	var req account.SendOTPRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	c.BindJSON(&req)

	log.Printf("request body: %v", req)

	s.service.SendOTP(req)

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) CheckOTP(c *gin.Context) {
	var req account.CheckOTPRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	c.BindJSON(&req)

	log.Printf("request body: %v", req)

	s.service.CheckOTP(req)

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func NewServer(service account.Service) Server {
	return &server{
		service: service,
	}
}

func (s *server) Bind(r *gin.Engine) {
	r.POST("/login", s.Login)
	r.POST("/user/register", s.UserRegister)
	r.POST("/user/update-password", s.UpdatePassword)
	r.POST("/user/send-otp", s.SendOTP)
	r.POST("/user/check-otp", s.CheckOTP)
}
