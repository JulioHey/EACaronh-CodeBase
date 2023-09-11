package user

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"repository/internal/repository"
	"strconv"
)

type userService struct {
	repo repository.BaseRepository[*User]
}

func (u *userService) Get() ([]*User, error) {
	return u.repo.Get()
}

func (u *userService) Create(newUser *User) (*User, error) {
	newUser.ID = strconv.Itoa(int(uuid.New().ID()))

	return u.repo.Create(newUser)
}

func (u *userService) GetById(id string) (*User, error) {
	return u.repo.GetById(id)
}

func (u *userService) Update(updatedUser *User) error {
	return u.repo.Update(updatedUser)
}

func (u *userService) Delete(id string) error {
	return u.repo.Delete(id)
}

func NewUserService(db *gorm.DB) repository.
	Service[*User] {
	repo := repository.BaseRepository[*User]{
		Database: db,
	}
	return &userService{
		repo: repo,
	}
}
