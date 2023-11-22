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
	r.POST("/students/", s.Create)
	r.PUT("/students/", s.Get)
	r.GET("/students/:id", s.GetByID)
	r.PUT("/students/:id", s.Update)
	r.DELETE("/students/:id", s.Delete)
}
