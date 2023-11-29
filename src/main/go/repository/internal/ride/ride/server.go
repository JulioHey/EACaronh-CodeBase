package ride

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Ride]
}

func NewRideServer(db *gorm.DB) *Server {
	newRideServer := &Server{}
	newRideServer.Service = NewRideService(db)
	return newRideServer
}

func (s *Server) BindRideServer(r *gin.Engine) {
	r.POST("/ride/", s.Create)
	r.PUT("/ride/", s.Get)
	r.GET("/ride/:id", s.GetByID)
	r.PUT("/ride/:id", s.Update)
	r.DELETE("/ride/:id", s.Delete)
}
