package employee

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/institutionuser"
	"repository/internal/repository"
)

type Employee struct {
	repository.Base
	InstitutionUserID string `json:"institution_user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	InstitutionUser   institutionuser.
				InstitutionUser `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Role        string `json:"role"`
	Department  string `json:"department"`
	IngressYear string `json:"ingress_year"`
}

func (e *Employee) Columns() []string {
	return []string{"id", "institution_user_id", "role", "department",
		"ingress_year"}
}

func AutoMigrateEmployee(db *gorm.DB) {
	migrator := db.Migrator()
	employee := &Employee{}
	if repository.Reset_Data {
		err := migrator.DropTable(employee)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}

	err := migrator.AutoMigrate(employee)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
