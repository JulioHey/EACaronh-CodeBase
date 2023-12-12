package address

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewAddressService(db *gorm.DB) service.Service[*Address] {
	repo := repository.BaseRepository[*Address]{
		Database: db,
	}
	return &service.BaseService[*Address]{
		Repo: repo,
	}
}
