package message

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewMessageService(db *gorm.DB) service.Service[*Message] {
	repo := repository.BaseRepository[*Message]{
		Database: db,
	}
	return &service.BaseService[*Message]{
		Repo: repo,
	}
}
