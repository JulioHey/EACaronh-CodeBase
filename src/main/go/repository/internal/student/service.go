package student

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"repository/internal/repository"
	"strconv"
)

type service struct {
	repo repository.BaseRepository[*Student]
}

func (u *service) Get(queries []repository.Query) ([]*Student, error) {
	users := []*Student{{}}
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

func (u *service) Create(newStudent *Student) (
	*Student,
	error) {
	newStudent.ID = strconv.Itoa(int(uuid.New().ID()))

	return u.repo.Create(newStudent)
}

func (u *service) GetById(id string) (*Student, error) {
	return u.repo.GetById(id)
}

func (u *service) Update(updatedStudent *Student) error {
	return u.repo.Update(updatedStudent)
}

func (u *service) Delete(id string) error {
	return u.repo.Delete(id)
}

func NewStudentService(db *gorm.DB) repository.
	Service[*Student] {
	repo := repository.BaseRepository[*Student]{
		Database: db,
	}
	return &service{
		repo: repo,
	}
}
