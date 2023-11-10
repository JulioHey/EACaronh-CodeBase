package user

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type User struct {
	ID             string `json:"id" param:"id" gorm:"primarykey"`
	Email          string `json:"email" gorm:"unique"`
	Name           string `json:"name" gorm:"not null"`
	BirthDate      string `json:"birth_date" gorm:"not null"`
	PhoneNumber    string `json:"phone_number" gorm:"not null"`
	DocumentNumber string `json:"document_number" gorm:"not null"`
	Created        int64  `json:"created" gorm:"autoCreateTime"`
}

func (u *User) GetID() string {
	return u.ID
}

func (u *User) SetID(id string) {
	u.ID = id
}

func (u *User) Columns() []string {
	return []string{"id", "name", "email", "created", "amount"}
}

func AutoMigrateUser(db *gorm.DB) {
	migrator := db.Migrator()
	user := &User{}
	if true {
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