package service

import (
	"github.com/google/uuid"
	"repository/internal/repository"
	"strconv"
)

type Service[T repository.Model] interface {
	Create(Model T) (T, error)
	GetById(id string) (T, error)
	Get(queries []repository.Query) ([]T, error)
	Update(Model T) error
	Delete(id string) error
}

type BaseService[T repository.Model] struct {
	Service[T]
	Repo repository.BaseRepository[T]
}

func (s *BaseService[T]) Get(queries []repository.Query) ([]T, error) {
	entity := new(T)
	for _, q := range queries {
		hasColumn := false
		for _, column := range (*entity).Columns() {
			if q.Field == column {
				hasColumn = true
				break
			}
		}
		if !hasColumn {
			return nil, repository.NewColumnNotFoundErr(q.Field)
		}
	}

	return s.Repo.Get(queries)
}

func (s *BaseService[T]) Create(newStudent T) (
	T,
	error) {
	newStudent.SetID(strconv.Itoa(int(uuid.New().ID())))

	return s.Repo.Create(newStudent)
}

func (s *BaseService[T]) GetById(id string) (T, error) {
	return s.Repo.GetById(id)
}

func (s *BaseService[T]) Update(updatedStudent T) error {
	return s.Repo.Update(updatedStudent)
}

func (s *BaseService[T]) Delete(id string) error {
	return s.Repo.Delete(id)
}
