package userpassword

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*UserPassword]
}

func (s *Server) BindUserPasswordServer(r *gin.Engine) {
	r.POST("/userpassword/", s.Create)
	r.PUT("/userpassword/", s.Get)
	r.GET("/userpassword/:id", s.GetByID)
	r.PUT("/userpassword/:id", s.Update)
	r.DELETE("/userpassword/:id", s.Delete)
}

func NewUserPasswordServer(db *gorm.DB) *Server {
	newUserServer := &Server{}
	newUserServer.Service = NewUserPasswordService(db)
	return newUserServer
}
