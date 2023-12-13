package ridepath

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*RidePath]
}

func NewRidePathServer(db *gorm.DB) *Server {
	newRidePathServer := &Server{}
	newRidePathServer.Service = NewRidePathService(db)
	return newRidePathServer
}

func (s *Server) BindRidePathServer(r *gin.Engine) {
	r.POST("/ridepath/", s.Create)
	r.PUT("/ridepath/", s.Get)
	r.GET("/ridepath/:id", s.GetByID)
	r.PUT("/ridepath/:id", s.Update)
	r.DELETE("/ridepath/:id", s.Delete)
}
