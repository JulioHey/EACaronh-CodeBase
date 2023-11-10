package institution

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"repository/internal/repository"
	"strconv"
)

type institutionService struct {
	repo repository.BaseRepository[*Institution]
}

func (u *institutionService) Get(queries []repository.Query) ([]*Institution,
	error) {
	users := []*Institution{{}}
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

func (u *institutionService) Create(newInstitution *Institution) (*Institution,
	error) {
	newInstitution.ID = strconv.Itoa(int(uuid.New().ID()))

	return u.repo.Create(newInstitution)
}

func (u *institutionService) GetById(id string) (*Institution, error) {
	return u.repo.GetById(id)
}

func (u *institutionService) Update(updatedInstitution *Institution) error {
	return u.repo.Update(updatedInstitution)
}

func (u *institutionService) Delete(id string) error {
	return u.repo.Delete(id)
}

func NewInstitutionService(db *gorm.DB) repository.Service[*Institution] {
	repo := repository.BaseRepository[*Institution]{
		Database: db,
	}
	return &institutionService{
		repo: repo,
	}
}
