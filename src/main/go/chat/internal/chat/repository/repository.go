package repository

import "fmt"

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

type Query struct {
	Field     string    `json:"field"`
	Operation Operation `json:"operation"`
	Targets   []string  `json:"targets"`
}

type NotFoundError struct {
	entity string
}

func (e *NotFoundError) Error() string {
	return fmt.Sprintf("%s not found", e.entity)
}

func NewNotFoundError(entity string) *NotFoundError {
	return &NotFoundError{
		entity: entity,
	}
}

type CreationError struct {
	entity string
	err    error
}

func (e *CreationError) Error() string {
	return fmt.Sprintf("%s creation error: %s", e.entity, e.err.Error())
}

func NewCreationError(entity string, err error) *CreationError {
	return &CreationError{
		entity: entity,
		err:    err,
	}
}
