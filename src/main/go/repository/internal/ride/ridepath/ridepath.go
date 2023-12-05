package ridepath

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/ride/ride"
)

type RidePath struct {
	repository.Base
	RideID    string    `json:"ride_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	Ride      ride.Ride `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ToAddress string    `json:"to_address"`
	From      string    `json:"from"`
	RideDate  string    `json:"ride_date"`
}

func (r *RidePath) Columns() []string {
	return []string{"id", "ride_id", "to_address", "from", "ride_date"}
}

func AutoMigrateRidePath(db *gorm.DB) {
	migrator := db.Migrator()
	ridePath := &RidePath{}
	if repository.ResetData {
		err := migrator.DropTable(ridePath)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(ridePath)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
