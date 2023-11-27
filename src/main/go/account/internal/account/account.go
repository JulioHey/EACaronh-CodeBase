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
	Email string `json:"email"`
}

type CheckOTPRequest struct {
	Email string `json:"email"`
	Code  string `json:"code"`
}
