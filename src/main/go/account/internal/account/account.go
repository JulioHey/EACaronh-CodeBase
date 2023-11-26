package account

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

type UpdatePasswordRequest struct {
	UserID   string `json:"user_id"`
	Password string `json:"password"`
}

type SendOTPRequest struct {
	PhoneNumber string `json:"phone_number"`
}

type CheckOTPRequest struct {
	Code string `json:"code"`
}
