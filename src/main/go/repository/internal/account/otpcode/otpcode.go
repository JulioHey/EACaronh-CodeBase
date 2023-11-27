package otpcode

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
)

type OTPCode struct {
	repository.Base
	Email string `json:"email" gorm:"unique; not null"`
	Code  string `json:"code" gorm:"not null"`
}

func (otp *OTPCode) Columns() []string {
	return []string{"id", "email", "code"}
}

func AutoMigrateOTPCode(db *gorm.DB) {
	migrator := db.Migrator()
	otpCode := &OTPCode{}
	if false {
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
