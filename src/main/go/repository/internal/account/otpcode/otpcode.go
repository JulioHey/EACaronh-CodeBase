package otpcode

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/account/user"
	"repository/internal/repository"
)

type OTPCode struct {
	repository.Base
	UserID string    `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	User   user.User `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Code   string    `json:"code" gorm:"not null"`
}

func (otp *OTPCode) Columns() []string {
	return []string{"id", "user_id", "code"}
}

func AutoMigrateOTPCode(db *gorm.DB) {
	migrator := db.Migrator()
	otpCode := &OTPCode{}
	if repository.ResetData {
		err := migrator.DropTable(otpCode)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(otpCode)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
