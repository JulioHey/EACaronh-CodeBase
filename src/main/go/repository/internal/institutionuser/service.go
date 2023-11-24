package institutionuser

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"repository/internal/repository"
	"strconv"
)

type service struct {
	repo repository.BaseRepository[*InstitutionUser]
}

func (u *service) Get(queries []repository.Query) ([]*InstitutionUser, error) {
	users := []*InstitutionUser{{}}
	for _, q := range queries {
		hasColumn := false
		for _, column := range users[0].Columns() {
			if q.Field == column {
				hasColumn = true
				break
			}
		}
		if !hasColumn {
			return nil, repository.NewColumnNotFoundErr(q.Field)
		}
	}

	return u.repo.Get(queries)
}

func (u *service) Create(newInstitutionUser *InstitutionUser) (
	*InstitutionUser,
	error) {
	newInstitutionUser.ID = strconv.Itoa(int(uuid.New().ID()))

	return u.repo.Create(newInstitutionUser)
}

func (u *service) GetById(id string) (*InstitutionUser, error) {
	return u.repo.GetById(id)
}

func (u *service) Update(updatedInstitutionUser *InstitutionUser) error {
	return u.repo.Update(updatedInstitutionUser)
}

func (u *service) Delete(id string) error {
	return u.repo.Delete(id)
}

func NewInstitutionUserService(db *gorm.DB) repository.
Service[*InstitutionUser] {
	repo := repository.BaseRepository[*InstitutionUser]{
		Database: db,
	}
	return &service{
		repo: repo,
	}
}
