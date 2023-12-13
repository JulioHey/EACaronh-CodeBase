package chat

// import (
// 	"github.com/go-playground/validator/v10"
// 	"regexp"
// )

type Message struct {
    ID           string `json:"id""`
	SenderID     string `json:"sender_id""`
	ReceiverID   string `json:"receiver_id""`
	Content      string `json:"content""`
}

func (m Message) GetPath() string {
	return "message"
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
