package ride

import (
	"gorm.io/gorm"
	"log"
	"repository/internal/account/user"
	"repository/internal/repository"
	"repository/internal/ride/address"
	"repository/internal/ride/car"
)

type Ride struct {
	repository.Base
	UserID        string          `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null""`
	User          user.User       `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CarID         string          `json:"car_id" gorm:"uniqueIndex:compositeindex;index;not null""`
	Car           car.Car         `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	FromAddressID string          `json:"from_address_id"  gorm:"uniqueIndex:compositeindex;index;not null"`
	FromAddress   address.Address `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:FromAddressID"`
	ToAddressID   string          `json:"to_address_id"  gorm:"uniqueIndex:compositeindex;index;not null"`
	ToAddress     address.Address `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:ToAddressID"`
	Price         string          `json:"price"`
	Seats         string          `json:"seats"`
	Date          string          `json:"date"`
	Time          string          `json:"time"`
}

func (r *Ride) Columns() []string {
	return []string{"id", "user_id", "car_id", "from_address_id", "to_address_id", "date", "time"}
}

func AutoMigrateRide(db *gorm.DB) {
	migrator := db.Migrator()
	ride := &Ride{}
	if repository.ResetData {
		err := migrator.DropTable(ride)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(ride)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
