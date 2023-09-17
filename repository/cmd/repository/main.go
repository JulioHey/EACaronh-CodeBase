package main

import (
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"repository/internal/user"
)

func main() {
	log.Printf("Connectiong to db")
	// Connect DB
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	log.Printf("Automigration db")
	// Create DB
	user.AutoMigrateUser(db)
	if err != nil {
		panic("failed to migrate database")
	}

	log.Printf("Creating servers db")
	// Create server
	userServer := user.NewUserServer(db)

	// Echo instance
	r := gin.Default()

	log.Printf("Binding routes db")

	// Routes
	userServer.BindUserServer(r)

	// Start server
	err = r.Run(":8080")
	if err != nil {
		log.Printf("Error while starting server: %v", err)
	}
}
