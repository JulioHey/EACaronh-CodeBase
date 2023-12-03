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
	validate := validator.New()
	err := validate.RegisterValidation("plate", ValidPlate)
	if err != nil {
		return err
	}

	return validate.Struct(c)
}

func ValidPlate(fl validator.FieldLevel) bool {
	plate := fl.Field().String()
	matched, err := regexp.MatchString(
		"^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$", plate)

	if err != nil {
		return false
	}
	return matched
}

func (c Car) GetPath() string {
	return "car"
}

type Ride struct {
	ID            string `json:"id""`
	UserID        string `json:"user_id""`
	CarID         string `json:"car_id" validate:"required"`
	Seats         string `json:"seats" validate:"required"`
	Date          string `json:"date" validate:"required"`
	Time          string `json:"time" validate:"required"`
	FromAddressID string `json:"from_address_id"`
	ToAddressID   string `json:"to_address_id"`
	Price         string `json:"price" validate:"required"`
}

func (r Ride) Validate() error {
	validate := validator.New()
	return validate.Struct(r)
}

func (r Ride) GetPath() string {
	return "ride"
}

type Address struct {
	ID       string `json:"id""`
	City     string `json:"city"`
	Street   string `json:"street"`
	Number   int    `json:"number"`
	PostCode string `json:"post_code"`
}

func (a Address) GetPath() string {
	return "address"
}

type CreateRideRequest struct {
	Ride        Ride    `json:"ride" validate:"required"`
	FromAddress Address `json:"from_address" validate:"required"`
	ToAddress   Address `json:"to_address" validate:"required"`
}

func (r CreateRideRequest) Validate() error {
	validate := validator.New()
	return validate.Struct(r)
}

type RequestRide struct {
	UserID  string  `json:"user_id" validate:"required"`
	RideID  string  `json:"ride_id" validate:"required"`
	Address Address `json:"address" validate:"required"`
}

func (r RequestRide) Validate() error {
	validate := validator.New()
	return validate.Struct(r)
}

type RideRequest struct {
	ID        string `json:"id"`
	UserID    string `json:"user_id"`
	RideID    string `json:"ride_id"`
	AddressID string `json:"address_id"`
	Status    string `json:"status"`
}

func (r RideRequest) GetPath() string {
	return "riderequest"
}

type RideResponse struct {
	ID      string `json:"id"`
	UserID  string `json:"user_id"`
	OwnerID string `json:"owner_id"`
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
