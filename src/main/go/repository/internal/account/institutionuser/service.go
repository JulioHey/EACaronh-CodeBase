package institutionuser

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewInstitutionUserService(db *gorm.DB) service.Service[*InstitutionUser] {
	repo := repository.BaseRepository[*InstitutionUser]{
		Database: db,
	}
	return &service.BaseService[*InstitutionUser]{
		Repo: repo,
	}
}
