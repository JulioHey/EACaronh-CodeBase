package user

type Client interface {
	CreateUser(req RegisterRequest) (string, error)
}

type clientImpl struct {
}
