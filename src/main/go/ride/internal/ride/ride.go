package ride

type Car struct {
	ID           string `json:"id""`
	UserID       string `json:"user_id""`
	Color        string `json:"color"`
	Brand        string `json:"brand"`
	Model        string `json:"model"`
	Year         string `json:"year"`
	LicensePlate string `json:"license_plate"`
	City         string `json:"city"`
	State        string `json:"state"`
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
