package student

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Student]
}

func NewStudentServer(db *gorm.DB) *Server {
	newStudentServer := &Server{}
	newStudentServer.Service = NewStudentService(db)
	return newStudentServer
}

func (s *Server) BindStudentServer(r *gin.Engine) {
	r.POST("/student/", s.Create)
	r.PUT("/student/", s.Get)
	r.GET("/student/:id", s.GetByID)
	r.PUT("/student/:id", s.Update)
	r.DELETE("/student/:id", s.Delete)
}
