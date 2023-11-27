package otpcode

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"repository/internal/server"
)

type Server struct {
	server.BaseServer[*OTPCode]
}

func (s *Server) BindOTPCodeServer(r *gin.Engine) {
	r.POST("/otpcode/", s.Create)
	r.PUT("/otpcode/", s.Get)
	r.GET("/otpcode/:id", s.GetByID)
	r.PUT("/otpcode/:id", s.Update)
	r.DELETE("/otpcode/:id", s.Delete)
}

func NewOTPCodeServer(db *gorm.DB) *Server {
	newUserServer := &Server{}
	newUserServer.Service = NewOTPCodeService(db)
	return newUserServer
}
