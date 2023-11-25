package employee

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewEmployeeService(db *gorm.DB) service.Service[*Employee] {
	repo := repository.BaseRepository[*Employee]{
		Database: db,
	}
	return &service.BaseService[*Employee]{
		Repo: repo,
	}
}
