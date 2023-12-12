package ride

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewRideService(db *gorm.DB) service.Service[*Ride] {
	repo := repository.BaseRepository[*Ride]{
		Database: db,
	}
	return &service.BaseService[*Ride]{
		Repo: repo,
	}
}
