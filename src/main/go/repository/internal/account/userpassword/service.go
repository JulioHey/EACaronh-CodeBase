package userpassword

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewUserPasswordService(db *gorm.DB) *service.BaseService[*UserPassword] {
	repo := repository.BaseRepository[*UserPassword]{
		Database: db,
	}
	return &service.BaseService[*UserPassword]{
		Repo: repo,
	}
}
