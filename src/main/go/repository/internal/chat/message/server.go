package message

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Message]
}

func (s *Server) BindMessageServer(r *gin.Engine) {
	r.POST("/message/", s.Create)
	r.GET("/message/", s.Get)
}

func NewMessageServer(db *gorm.DB) *Server {
	newMessageServer := &Server{}
	newMessageServer.Service = NewMessageService(db)
	return newMessageServer
}
