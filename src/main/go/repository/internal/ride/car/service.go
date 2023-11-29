package car

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewCarService(db *gorm.DB) service.Service[*Car] {
	repo := repository.BaseRepository[*Car]{
		Database: db,
	}
	return &service.BaseService[*Car]{
		Repo: repo,
	}
}
