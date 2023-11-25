package institution

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
)

type Institution struct {
	repository.Base
	Name   string `json:"name" gorm:"not null; uniqueIndex"`
	Domain string `json:"domain" gorm:"not null; uniqueIndex"`
}

func (i *Institution) Columns() []string {
	return []string{"id", "name", "domain"}
}

func AutoMigrateInstitution(db *gorm.DB) {
	migrator := db.Migrator()
	institution := &Institution{}
	if repository.ResetData {
		err := migrator.DropTable(institution)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}

	}
	err := migrator.AutoMigrate(institution)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
