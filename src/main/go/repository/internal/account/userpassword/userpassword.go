package userpassword

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/account/user"
	"repository/internal/repository"
)

type UserPassword struct {
	repository.Base
	UserID   string    `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	User     user.User `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Password string    `json:"password" gorm:"not null"`
}

func (u *UserPassword) Columns() []string {
	return []string{"user_id", "password"}
}

func AutoMigrateUserPassword(db *gorm.DB) {
	migrator := db.Migrator()
	userPassword := &UserPassword{}
	if repository.ResetData {
		err := migrator.DropTable(userPassword)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(userPassword)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
