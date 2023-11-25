package main

import (
	"account/internal/account"
	"account/internal/account/api"
	"account/internal/account/repository/institution"
	"account/internal/server"
	"github.com/gin-gonic/gin"
	"log"
)

func main() {
	req := account.NewServiceRequest{
		InstitutionClient: institution.NewClient(institution.NewRepo(
			"http://127.0.0.0:8080", api.NewHTTPClient())),
	}

	accountService := account.NewService(req)

	server := server.NewServer(accountService)

	r := gin.Default()

	server.Bind(r)

	err := r.Run(":9000")
	if err != nil {
		log.Printf("failed to start server: %v", err)
	}
}
