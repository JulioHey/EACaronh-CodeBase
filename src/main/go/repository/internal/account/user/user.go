package user

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
)

type User struct {
	repository.Base
	Email          string `json:"email" gorm:"unique"`
	Name           string `json:"name" gorm:"not null"`
	BirthDate      string `json:"birth_date" gorm:"not null"`
	PhoneNumber    string `json:"phone_number" gorm:"not null"`
	DocumentNumber string `json:"document_number" gorm:"not null"`
}

func (u *User) Columns() []string {
	return []string{"id", "email", "name", "birth_date", "phone_number",
		"document_number"}
}

func AutoMigrateUser(db *gorm.DB) {
	migrator := db.Migrator()
	user := &User{}
	if repository.ResetData {
		err := migrator.DropTable(user)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}

	}
	err := migrator.AutoMigrate(user)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
