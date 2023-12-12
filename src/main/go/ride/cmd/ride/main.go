package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"ride/internal/server"
)

func main() {

	rideServer := server.NewServer()

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	r.Use(cors.New(config))
	rideServer.Bind(r)
	err := r.Run(":9001")
	if err != nil {
		log.Printf("failed to start server: %v", err)
	}
}
