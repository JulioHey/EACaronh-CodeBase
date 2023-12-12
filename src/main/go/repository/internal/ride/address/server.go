package address

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*Address]
}

func NewAddressServer(db *gorm.DB) *Server {
	newAddressServer := &Server{}
	newAddressServer.Service = NewAddressService(db)
	return newAddressServer
}

func (s *Server) BindAddressServer(r *gin.Engine) {
	r.POST("/address/", s.Create)
	r.PUT("/address/", s.Get)
	r.GET("/address/:id", s.GetByID)
	r.PUT("/address/:id", s.Update)
	r.DELETE("/address/:id", s.Delete)
}
