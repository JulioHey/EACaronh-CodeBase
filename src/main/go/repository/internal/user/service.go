package user

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewUserService(db *gorm.DB) service.Service[*User] {
	repo := repository.BaseRepository[*User]{
		Database: db,
	}
	return &service.BaseService[*User]{
		Repo: repo,
	}
}
