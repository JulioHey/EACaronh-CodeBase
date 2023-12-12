package riderequest

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewRideRequestService(db *gorm.DB) service.Service[*RideRequest] {
	repo := repository.BaseRepository[*RideRequest]{
		Database: db,
	}
	return &service.BaseService[*RideRequest]{
		Repo: repo,
	}
}
