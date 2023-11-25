package user

import (
	"github.com/go-playground/validator/v10"
	"time"
)

type InstitutionRole string

const (
	Student  InstitutionRole = "STUDENT"
	Employee InstitutionRole = "EMPLOYEE"
)

type RegisterRequest struct {
	User            User            `json:"user"`
	InstitutionUser InstitutionUser `json:"institution_user"`
}

type InstitutionUser struct {
	InstitutionName string          `json:"institution_name"`
	InstitutionCode string          `json:"institution_code"`
	Role            InstitutionRole `json:"role" validate:"is-role-valid"`
	StudentUser     *StudentUser    `json:"student_user"`
	EmployeeUser    *EmployeeUser   `json:"employee_user"`
}

type StudentUser struct {
	Course    string `json:"course"`
	EntryYear string `json:"entry_year"`
	Period    string `json:"period"`
}

type EmployeeUser struct {
	Role string `json:"role"`
}

type User struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	BirthDate      string `json:"birth_date" validate:"date"`
	PhoneNumber    string `json:"phone_number"`
	DocumentNumber string `json:"document_number"`
	Email          string `json:"email" validate:"email"`
}

type ValidationError struct {
	Err error
}

func (e *ValidationError) Error() string {
	return e.Err.Error()
}

func NewValidationError(err error) error {
	return &ValidationError{
		Err: err,
	}
}

func (u RegisterRequest) Validate() error {
	validate := validator.New()
	validate.RegisterValidation("is-role-valid", IsRoleValid)
	validate.RegisterValidation("date", ValidDate)

	return validate.Struct(u)
}

func ValidDate(fl validator.FieldLevel) bool {
	birthDate := fl.Field().String()
	_, err := time.Parse("2006-01-02", birthDate)
	return err == nil
}

// IsRoleValid implements validator.Func
func IsRoleValid(fl validator.FieldLevel) bool {
	role := InstitutionRole(fl.Field().String())
	if role == Student {
		studentUser := fl.Parent().FieldByName("StudentUser").Interface()
		return !(studentUser == nil)
	} else if role == Employee {
		employeeUser := fl.Parent().FieldByName("EmployeeUser").Interface()
		return !(employeeUser == nil)
	}
	return false
}
