package repository

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
)

type GormDatabase interface {
	Find(dest interface{}, conds ...interface{}) (tx *gorm.DB)
	First(dest interface{}, conds ...interface{}) (tx *gorm.DB)
	Create(value interface{}) (tx *gorm.DB)
	Updates(values interface{}) (tx *gorm.DB)
	Delete(value interface{}, conds ...interface{}) (tx *gorm.DB)
}

type Model interface {
	GetID() string
	SetID(string)
}

type Service[T Model] interface {
	Create(Model T) (T, error)
	GetById(id string) (T, error)
	Get() ([]T, error)
	Update(Model T) error
	Delete(id string) error
}

type Repository[T Model] interface {
	Get() ([]T, error)
	GetById(Model T) (*T, error)
	Create(Model T) (*T, error)
	Update(Model T) error
	Delete(id string) error
}

type BaseRepository[T Model] struct {
	Database GormDatabase
}

func (r *BaseRepository[T]) Get() ([]T, error) {
	var entities []T
	result := r.Database.Find(&entities)
	if result.Error != nil {
		log.Printf("Error while finding rows: %v", result.Error)
		return nil, result.Error
	}
	log.Printf("Affeted: %v rows", result.RowsAffected)

	return entities, nil
}

func (r *BaseRepository[T]) GetById(id string) (T, error) {
	entity := new(T)
	result := r.Database.First(entity, id)
	if result.Error != nil {
		log.Printf("Error: %v", result.Error)
		return *entity, result.Error
	}
	log.Printf("Affeted: %v rows", result.RowsAffected)

	return *entity, nil
}

func (r *BaseRepository[T]) Create(entity T) (T, error) {
	result := r.Database.Create(entity)
	if result.Error != nil {
		log.Printf("Error: %v", result.Error)
		return entity, result.Error
	}
	log.Printf("Affeted: %v rows", result.RowsAffected)
	return entity, nil
}

func (r *BaseRepository[T]) Update(entity T) error {
	result := r.Database.Updates(entity)
	if result.Error != nil {
		log.Printf("Error while updating columns: %v", result.Error)
		return result.Error
	}
	log.Printf("Affeted: %v rows", result.RowsAffected)

	return nil
}

func (r *BaseRepository[T]) Delete(id string) error {
	return r.Database.Delete(new(T), id).Error
}
