package institutionuser

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*InstitutionUser]
}

func NewInstitutionUserServer(db *gorm.DB) *Server {
	newInstitutionUserServer := &Server{}
	newInstitutionUserServer.Service = NewInstitutionUserService(db)
	return newInstitutionUserServer
}

func (s *Server) BindInstitutionUserServer(r *gin.Engine) {
	r.POST("/institutionuser/", s.Create)
	r.PUT("/institutionuser/", s.Get)
	r.GET("/institutionuser/:id", s.GetByID)
	r.PUT("/institutionuser/:id", s.Update)
	r.DELETE("/institutionuser/:id", s.Delete)
}
