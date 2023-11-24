package employee

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"repository/internal/repository"
	"strconv"
)

type service struct {
	repo repository.BaseRepository[*Employee]
}

func (s *service) Get(queries []repository.Query) ([]*Employee, error) {
	users := []*Employee{{}}
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

	return s.repo.Get(queries)
}

func (u *service) Create(newEmployee *Employee) (
	*Employee,
	error) {
	newEmployee.ID = strconv.Itoa(int(uuid.New().ID()))

	return u.repo.Create(newEmployee)
}

func (u *service) GetById(id string) (*Employee, error) {
	return u.repo.GetById(id)
}

func (u *service) Update(updatedEmployee *Employee) error {
	return u.repo.Update(updatedEmployee)
}

func (u *service) Delete(id string) error {
	return u.repo.Delete(id)
}

func NewEmployeeService(db *gorm.DB) repository.
	Service[*Employee] {
	repo := repository.BaseRepository[*Employee]{
		Database: db,
	}
	return &service{
		repo: repo,
	}
}
