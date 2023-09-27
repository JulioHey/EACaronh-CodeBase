package user

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type User struct {
	ID      string `json:"id" param:"id" gorm:"primarykey"`
	Name    string `json:"name" gorm:"not null"`
	Email   string `json:"email" gorm:"unique"`
	Created int64  `json:"created" gorm:"autoCreateTime"`
}

func (u *User) GetID() string {
	return u.ID
}

func (u *User) SetID(id string) {
	u.ID = id
}

func (u *User) Columns() []string {
	return []string{"id", "name", "email", "created"}
}

func AutoMigrateUser(db *gorm.DB) {
	migrator := db.Migrator()
	user := &User{}
	if false {
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
