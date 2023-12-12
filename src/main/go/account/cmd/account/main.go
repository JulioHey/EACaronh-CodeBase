package main

import (
	"account/internal/account"
	"account/internal/server"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	req := account.NewServiceRequest{
		RepoURL: "http://localhost:8080",
	}

	accountService := account.NewService(req)

	newServer := server.NewServer(accountService)

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("Authorization")
	newServer.Bind(r)
	r.Use(cors.New(config))
	err := r.Run(":9000")
	if err != nil {
		log.Printf("failed to start server: %v", err)
	}
}
