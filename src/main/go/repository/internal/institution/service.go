package institution

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewInstitutionService(db *gorm.DB) service.Service[*Institution] {
	repo := repository.BaseRepository[*Institution]{
		Database: db,
	}
	return &service.BaseService[*Institution]{
		Repo: repo,
	}
}
