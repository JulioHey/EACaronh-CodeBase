package car

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Car]
}

func NewCarServer(db *gorm.DB) *Server {
	newCarServer := &Server{}
	newCarServer.Service = NewCarService(db)
	return newCarServer
}

func (s *Server) BindCarServer(r *gin.Engine) {
	r.POST("/car/", s.Create)
	r.PUT("/car/", s.Get)
	r.GET("/car/:id", s.GetByID)
	r.PUT("/car/:id", s.Update)
	r.DELETE("/car/:id", s.Delete)
}
