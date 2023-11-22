package institution

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type Institution struct {
	ID     string `json:"id" param:"id" gorm:"primarykey"`
	Name   string `json:"name" gorm:"not null; uniqueIndex"`
	Domain string `json:"domain" gorm:"not null; uniqueIndex"`
}

func (i *Institution) SetID(id ...string) {
	i.ID = id[0]
}

func (i *Institution) Columns() []string {
	return []string{"id", "name", "domain"}
}

func AutoMigrateInstitution(db *gorm.DB) {
	migrator := db.Migrator()
	institution := &Institution{}
	if false {
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
