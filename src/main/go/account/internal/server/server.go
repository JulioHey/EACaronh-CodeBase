package server

import (
	"account/internal/account"
	"account/internal/middlewares"
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

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Received user register request: %v", req)

	res, err := s.service.Login(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Internal service error": err.
			Error()})
		return
	}
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PUT")
	c.JSON(http.StatusOK, res)
}

func (s *server) UserRegister(c *gin.Context) {
	var req account.RegisterRequest

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	log.Printf("Received user register request: %v", req)

	res, err := s.service.UserRegister(req)

	if err != nil {
		var validationError *account.ValidationError
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

	c.JSON(http.StatusOK, res)
	return
}

func (s *server) UpdatePassword(c *gin.Context) {
	var req account.UpdatePasswordRequest
	err := c.Bind(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	req.UserID = c.Query("user_id")
	log.Printf("request body: %v", req)
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

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}
	log.Printf("request body: %v", req)

	err = s.service.SendOTP(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Internal service error": err.
			Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (s *server) CheckOTP(c *gin.Context) {
	var req account.CheckOTPRequest

	err := c.BindJSON(&req)
	if err != nil {
		log.Printf("failed to bind json: %v", err)
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	log.Printf("request body: %v", req)

	err = s.service.CheckOTP(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Internal service error": err.
			Error()})
		return
	}

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
	r.POST("/user/update-password", middlewares.TokenHandler(), s.UpdatePassword)
	r.POST("/user/send-otp", s.SendOTP)
	r.POST("/user/check-otp", s.CheckOTP)
}
