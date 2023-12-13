package riderequest

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/account/user"
	"repository/internal/repository"
	"repository/internal/ride/address"
	"repository/internal/ride/ride"
)

type RideRequest struct {
	repository.Base
	RideID    string          `json:"ride_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	Ride      ride.Ride       `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserID    string          `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	User      user.User       `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Status    string          `json:"status"`
	AddressID string          `json:"address_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	Address   address.Address `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:AddressID"`
}

func (r *RideRequest) Columns() []string {
	return []string{"id", "ride_id", "user_id", "status", "address_id"}
}

func AutoMigrateRideRequest(db *gorm.DB) {
	migrator := db.Migrator()
	rideRequest := &RideRequest{}
	if repository.ResetData {
		err := migrator.DropTable(rideRequest)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(rideRequest)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
