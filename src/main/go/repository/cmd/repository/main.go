package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"repository/internal/institution"
	"repository/internal/student"
	"repository/internal/user"
)

func main() {
	log.Printf("Connectiong to db")
	// Connect DB
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		"localhost", "5432", "postgres", "admin", "postgres", "disable")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	log.Printf("Automigration db")
	// Create DB
	user.AutoMigrateUser(db)
	institution.AutoMigrateInstitution(db)
	student.AutoMigrateStudent(db)
	if err != nil {
		panic("failed to migrate database")
	}

	log.Printf("Creating servers db")
	// Create server
	userServer := user.NewUserServer(db)
	institutionServer := institution.NewInstitutionServer(db)
	studentServer := student.NewStudentServer(db)

	// Echo instance
	r := gin.Default()

	log.Printf("Binding routes db")

	// Routes
	userServer.BindUserServer(r)
	institutionServer.BindInstitutionServer(r)
	studentServer.BindStudentServer(r)

	// Start server
	err = r.Run(":8080")
	if err != nil {
		log.Printf("Error while starting server: %v", err)
	}
}
