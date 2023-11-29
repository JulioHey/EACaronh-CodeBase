package address

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
)

type Address struct {
	repository.Base
	City     string `json:"city"`
	Street   string `json:"street"`
	Number   int    `json:"number"`
	PostCode string `json:"post_code"`
}

func (a *Address) Columns() []string {
	return []string{"id", "city", "street", "number", "post_code"}
}

func AutoMigrateAddress(db *gorm.DB) {
	migrator := db.Migrator()
	address := &Address{}
	if repository.ResetData {
		err := migrator.DropTable(address)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(address)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
