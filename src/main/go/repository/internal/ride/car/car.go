package car

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/account/user"
	"repository/internal/repository"
)

type Car struct {
	repository.Base
	UserID       string    `json:"user_id" gorm:"uniqueIndex:compositeindex;index;not null""`
	User         user.User `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Color        string    `json:"color"`
	Brand        string    `json:"brand"`
	Model        string    `json:"model"`
	Year         string    `json:"year"`
	LicensePlate string    `json:"license_plate"`
	City         string    `json:"city"`
	State        string    `json:"state"`
}

func (c *Car) Columns() []string {
	return []string{"id", "user_id", "brand", "model", "year", "license_plate"}
}

func AutoMigrateCar(db *gorm.DB) {
	migrator := db.Migrator()
	car := &Car{}
	if repository.ResetData {
		err := migrator.DropTable(car)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
	err := migrator.AutoMigrate(car)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
