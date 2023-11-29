package riderequest

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*RideRequest]
}

func NewRideRequestServer(db *gorm.DB) *Server {
	newRideRequestServer := &Server{}
	newRideRequestServer.Service = NewRideRequestService(db)
	return newRideRequestServer
}

func (s *Server) BindRideRequestServer(r *gin.Engine) {
	r.POST("/riderequest/", s.Create)
	r.PUT("/riderequest/", s.Get)
	r.GET("/riderequest/:id", s.GetByID)
	r.PUT("/riderequest/:id", s.Update)
	r.DELETE("/riderequest/:id", s.Delete)
}
