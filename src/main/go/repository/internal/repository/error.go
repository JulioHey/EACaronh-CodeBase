package repository

import "fmt"

type ColumnNotFoundErr struct {
	column string
}

func (e ColumnNotFoundErr) Error() string {
	return fmt.Sprintf("column %s not found", e.column)
}

func NewColumnNotFoundErr(column string) error {
	return ColumnNotFoundErr{column: column}
}
