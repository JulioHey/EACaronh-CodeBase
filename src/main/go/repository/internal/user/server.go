package user

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*User]
}

func (s *Server) BindUserServer(r *gin.Engine) {
	r.POST("/users/", s.Create)
	r.PUT("/users/", s.Get)
	r.GET("/users/:id", s.GetByID)
	r.PUT("/users/:id", s.Update)
	r.DELETE("/users/:id", s.Delete)
}

func NewUserServer(db *gorm.DB) *Server {
	newUserServer := &Server{}
	newUserServer.Service = NewUserService(db)
	return newUserServer
}
