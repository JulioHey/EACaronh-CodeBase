package user

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.Server[*User]
}

func (s *Server) BindUserServer(e *echo.Echo) {
	e.POST("/users/", s.Create)
	e.GET("/users/", s.Get)
	e.GET("/users/:id", s.GetByID)
	e.PUT("/users/:id", s.Update)
	e.DELETE("/users/:id", s.Delete)
}

func NewUserServer(db *gorm.DB) *Server {
	newUserServer := &Server{}
	newUserServer.Service = NewUserService(db)
	return newUserServer
}
