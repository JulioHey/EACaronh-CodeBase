package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"ride/internal/server"
)

func main() {
	r := gin.Default()

	rideServer := server.NewServer()

	rideServer.Bind(r)

	err := r.Run(":9001")
	if err != nil {
		log.Printf("failed to start server: %v", err)
	}
}
