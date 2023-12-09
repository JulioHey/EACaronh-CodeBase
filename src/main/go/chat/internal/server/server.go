package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
// 	"chat/internal/middlewares"
	"chat/internal/chat"
)

type Server interface {
	SendMessage(c *gin.Context)
	RetrieveMessages(c *gin.Context)
	Bind(c *gin.Engine)
}

type server struct {
	service chat.Service
}

func (s *server) SendMessage(c *gin.Context) {
	var msg chat.Message
	err := c.BindJSON(&msg)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
		return
	}

	newMessage, err := s.service.SendMessage(&msg)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, newMessage)
}

func (s *server) RetrieveMessages(c *gin.Context) {

	userID := c.Query("user_id")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user id is required"})
		return
	}

	messages, err := s.service.RetrieveMessages(userID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, messages)
}


func NewServer() Server {
	return &server{
		service: chat.NewService(),
	}
}

func (s *server) Bind(r *gin.Engine) {
// 	r.POST("/chat", middlewares.TokenHandler(), s.SendMessage)
// 	r.GET("/chat", middlewares.TokenHandler(), s.RetrieveMessages)
	r.POST("/chat", s.SendMessage)
	r.GET("/chat", s.RetrieveMessages)
}
