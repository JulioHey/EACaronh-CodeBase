package otpcode

import (
	"gorm.io/gorm"
	"repository/internal/repository"
	"repository/internal/service"
)

func NewOTPCodeService(db *gorm.DB) *service.BaseService[*OTPCode] {
	repo := repository.BaseRepository[*OTPCode]{
		Database: db,
	}
	return &service.BaseService[*OTPCode]{
		Repo: repo,
	}
}
