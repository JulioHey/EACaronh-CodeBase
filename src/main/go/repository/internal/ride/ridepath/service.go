package ridepath

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewRidePathService(db *gorm.DB) service.Service[*RidePath] {
	repo := repository.BaseRepository[*RidePath]{
		Database: db,
	}
	return &service.BaseService[*RidePath]{
		Repo: repo,
	}
}
