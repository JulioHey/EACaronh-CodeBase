package user

import (
	"account/internal/account/repository/institution"
	"github.com/go-playground/validator/v10"
	"time"
)

type InstitutionRole string

const (
	StudentROLE  InstitutionRole = "STUDENT"
	EmployeeROLE InstitutionRole = "EMPLOYEE"
)

type RegisterRequest struct {
	User            *User               `json:"user"`
	InstitutionUser *InstitutionUserReq `json:"institution_user"`
	Institution     *institution.Institution
}

type InstitutionUser struct {
	ID                 string `json:"id"`
	InstitutionID      string `json:"institution_id"`
	UserID             string `json:"user_id"`
	RegistrationNumber string `json:"registration_number"`
}

func (i *InstitutionUser) GetPath() string {
	return "institutionuser"
}

type UserPassword struct {
	ID       string `json:"id"`
	UserID   string `json:"user_id"`
	Password string `json:"password"`
}

func (u *UserPassword) GetPath() string {
	return "userpassword"
}

type InstitutionUserReq struct {
	InstitutionName    string          `json:"institution_name"`
	RegistrationNumber string          `json:"registration_number"`
	Role               InstitutionRole `json:"role" validate:"is-role-valid"`
	StudentUser        *Student        `json:"student_user"`
	EmployeeUser       *EmployeeUser   `json:"employee_user"`
}

type Student struct {
	InstitutionUserID string `json:"institution_user_id"`
	Course            string `json:"course"`
	IngressYear       string `json:"ingress_year"`
	Period            string `json:"period"`
	ProgramType       string `json:"program_type"`
}

func (s *Student) GetPath() string {
	return "student"
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

func (u *User) GetPath() string {
	return "users"
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
	if role == StudentROLE {
		studentUser := fl.Parent().FieldByName("StudentUser").Interface()
		return !(studentUser == nil)
	} else if role == EmployeeROLE {
		employeeUser := fl.Parent().FieldByName("EmployeeUser").Interface()
		return !(employeeUser == nil)
	}
	return false
}

type SendOTPRequest struct {
	Email string `json:"email"`
}

type OTPCode struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Code  string `json:"code"`
}

func (otp *OTPCode) GetPath() string {
	return "otpcode"
}
