package institutionuser

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/institution"
	"repository/internal/user"
)

type InstitutionUser struct {
	ID            string    `json:"id" param:"id" gorm:"primarykey"`
	UserID        string    `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	User          user.User `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	InstitutionID string    `json:"institution_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	Institution   institution.
			Institution `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	RegistrationNumber string `json:"registration_number"`
}

func (s *InstitutionUser) SetID(id string) {
	s.ID = id
}

func (s *InstitutionUser) Columns() []string {
	return []string{"user_id", "institution_id", "course", "ingress_year", "period", "registration_number"}
}

func AutoMigrateInstitutionUser(db *gorm.DB) {
	migrator := db.Migrator()
	student := &InstitutionUser{}
	if false {
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