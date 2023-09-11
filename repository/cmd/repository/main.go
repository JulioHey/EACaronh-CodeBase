package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
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
	e := echo.New()

	// Middleware
	e.Use(middleware.Recover())

	log.Printf("Binding routes db")

	// Routes
	userServer.BindUserServer(e)

	// Start server
	e.Logger.Fatal(e.Start(":1323"))
}
