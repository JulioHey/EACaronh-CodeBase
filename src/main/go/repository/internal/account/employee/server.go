package employee

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Employee]
}

func (s *Server) BindEmployeeServer(r *gin.Engine) {
	r.POST("/employee/", s.Create)
	r.PUT("/employee/", s.Get)
	r.GET("/employee/:id", s.GetByID)
	r.PUT("/employee/:id", s.Update)
	r.DELETE("/employee/:id", s.Delete)
}

func NewEmployeeServer(db *gorm.DB) *Server {
	newUserServer := &Server{}
	newUserServer.Service = NewEmployeeService(db)
	return newUserServer
}
