package repository

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"time"
)

// Operation represents the operation that the query will do in database
type Operation string

const (
	// BETWEEN needs two targets entity.Field < x < entity.Field
	BETWEEN Operation = "BETWEEN"
	// GREATER_THAN needs one target entity.Field > x
	GREATER_THAN Operation = "GREATER_THAN"
	// LESS_THAN needs one target entity.Field < x
	LESS_THAN Operation = "LESS_THAN"
	// EQUAL needs one target entity.Field = x
	EQUAL Operation = "EQUAL"
	// LIKE needs one target entity.Field LIKE x
	LIKE Operation = "LIKE"
	// IN needs one target entity.Field IN x
	IN Operation = "IN"
)

// Query represents a query that will run in database,
// it will help us construct a repository that will be fully reusable
type Query struct {
	Field     string    `json:"field"`
	Operation Operation `json:"operation"`
	Targets   []string  `json:"targets"`
}

type GormDatabase interface {
	Find(dest interface{}, conds ...interface{}) (tx *gorm.DB)
	First(dest interface{}, conds ...interface{}) (tx *gorm.DB)
	Create(value interface{}) (tx *gorm.DB)
	Updates(values interface{}) (tx *gorm.DB)
	Delete(value interface{}, conds ...interface{}) (tx *gorm.DB)
	Where(query interface{}, args ...interface{}) (tx *gorm.DB)
}

type Base struct {
	ID        string     `json:"id" param:"id" gorm:"primaryKey"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"deleted_at"`
}

var ResetData = false

func (base *Base) BeforeCreate(tx *gorm.DB) (err error) {
	base.ID = uuid.New().String()
	return
}

type Model interface {
	SetID(string)
	Columns() []string
}

func (base *Base) SetID(id string) {
	base.ID = id
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

func concatQuery(queries []string) string {
	completeQuery := ""
	for i, q := range queries {
		if i == 0 {
			completeQuery = q
		} else {
			completeQuery += " AND " + q
		}
	}
	return completeQuery
}

func constructQuery(queries []Query) string {
	var queriesOutput []string
	for _, q := range queries {
		var query string
		if q.Operation == BETWEEN {
			query = fmt.Sprintf("%s BETWEEN %s AND %s", q.Field,
				q.Targets[0], q.Targets[1])
		} else if q.Operation == EQUAL {
			query = fmt.Sprintf("%s = '%s'", q.Field, q.Targets[0])
		} else if q.Operation == IN {
			in := ""
			for index, t := range q.Targets {
				if index != 0 {
					in += ", "
				}
				in += fmt.Sprintf("'%s'", t)
			}
			query = fmt.Sprintf("%s IN (%s)", q.Field, in)
		} else if q.Operation == GREATER_THAN {
			query = fmt.Sprintf("%s > '%s'", q.Field, q.Targets[0])
		} else if q.Operation == LESS_THAN {
			query = fmt.Sprintf("%s < '%s'", q.Field, q.Targets[0])
		} else if q.Operation == LIKE {
			query = fmt.Sprintf("%s LIKE '%s'", q.Field, q.Targets[0])
		}
		queriesOutput = append(queriesOutput, query)
	}

	return concatQuery(queriesOutput)
}

func (r *BaseRepository[T]) Get(queries []Query) ([]T, error) {
	var entities []T

	query := constructQuery(queries)

	log.Printf("Query: %s", query)

	result := r.Database.Where(query).Find(&entities)
	if result.Error != nil {
		log.Printf("Error while finding rows: %v", result.Error)
		return nil, result.Error
	}
	log.Printf("Affeted: %v rows", result.RowsAffected)

	return entities, nil
}

func (r *BaseRepository[T]) GetById(id string) (T, error) {
	entity := new(T)
	result := r.Database.First(&entity, "id = ?", id)
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
	return r.Database.Delete(new(T), "id = ?", id).Error
}
