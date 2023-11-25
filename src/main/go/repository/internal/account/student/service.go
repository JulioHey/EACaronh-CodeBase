package student

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewStudentService(db *gorm.DB) service.Service[*Student] {
	repo := repository.BaseRepository[*Student]{
		Database: db,
	}
	return &service.BaseService[*Student]{
		Repo: repo,
	}
}
