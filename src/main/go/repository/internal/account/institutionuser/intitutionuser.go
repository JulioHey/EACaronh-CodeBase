package institutionuser

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/account/institution"
	"repository/internal/account/user"
	"repository/internal/repository"
)

type InstitutionUser struct {
	repository.Base
	UserID             string                  `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	User               user.User               `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	InstitutionID      string                  `json:"institution_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	Institution        institution.Institution `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	RegistrationNumber string                  `json:"registration_number"`
}

func (s *InstitutionUser) Columns() []string {
	return []string{"user_id", "institution_id", "course", "ingress_year", "period", "registration_number"}
}

func AutoMigrateInstitutionUser(db *gorm.DB) {
	migrator := db.Migrator()
	student := &InstitutionUser{}
	if repository.ResetData {
		err := migrator.DropTable(student)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}

	err := migrator.AutoMigrate(student)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
