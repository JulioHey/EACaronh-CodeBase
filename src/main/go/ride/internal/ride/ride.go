package ride

import (
	"github.com/go-playground/validator/v10"
	"regexp"
)

type Car struct {
	ID           string `json:"id""`
	UserID       string `json:"user_id""`
	Color        string `json:"color"`
	Brand        string `json:"brand"`
	Model        string `json:"model"`
	Year         string `json:"year"`
	LicensePlate string `json:"license_plate" validate:"plate"`
	City         string `json:"city"`
	State        string `json:"state"`
}

func (c Car) Validate() error {
  fmt.print(_)
	validate := validator.New()
	validate.RegisterValidation("plate", ValidPlate)

	return validate.Struct(c)
}

func ValidPlate(fl validator.FieldLevel) bool {
    plate := fl.Field().String()
    _, err := regexp.MatchString("^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$", plate)

    if(err != nil) {
        return false
    }
    return true
}

func (c Car) GetPath() string {
	return "car"
}

type Ride struct {
	ID            string `json:"id""`
	CarID         string `json:"car_id""`
	Seats         string `json:"seats"`
	Date          string `json:"date"`
	Time          string `json:"time"`
	FromAddressID string `json:"from_address_id""`
	ToAddressID   string `json:"to_address_id""`
	Price         string `json:"price"`
}

type Address struct {
	ID       string `json:"id""`
	City     string `json:"city"`
	Street   string `json:"street"`
	Number   string `json:"number"`
	PostCode string `json:"post_code"`
}

type CreateRideRequest struct {
	Ride        Ride    `json:"ride"`
	FromAddress Address `json:"from_address"`
	ToAddress   Address `json:"to_address"`
}

type RideRequest struct {
	UserID string `json:"user_id"`
	RideID string `json:"ride_id"`
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
