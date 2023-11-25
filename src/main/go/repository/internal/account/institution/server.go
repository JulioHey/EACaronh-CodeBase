package institution

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Institution]
}

func (s *Server) BindInstitutionServer(r *gin.Engine) {
	r.POST("/institution/", s.Create)
	r.PUT("/institution/", s.Get)
	r.GET("/institution/:id", s.GetByID)
	r.PUT("/institution/:id", s.Update)
	r.DELETE("/institution/:id", s.Delete)
}

func NewInstitutionServer(db *gorm.DB) *Server {
	newInstitutionServer := &Server{}
	newInstitutionServer.Service = NewInstitutionService(db)
	return newInstitutionServer
}
