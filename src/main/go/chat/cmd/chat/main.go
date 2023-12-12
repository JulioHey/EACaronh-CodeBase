package main

import (
	"github.com/gin-gonic/gin"
	"log"
	"chat/internal/server"
)

func main() {
	r := gin.Default()

	chatServer := server.NewServer()

	chatServer.Bind(r)

	err := r.Run(":9002")
	if err != nil {
		log.Printf("failed to start server: %v", err)
	}
}
