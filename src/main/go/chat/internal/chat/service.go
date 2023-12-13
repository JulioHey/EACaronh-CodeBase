package chat

import (
	"chat/internal/chat/api"
	"chat/internal/chat/repository"
	"chat/internal/chat/repository/base"
)

type Service interface {
    SendMessage(msg *Message) (*Message, error)
    RetrieveMessages(userID string) ([]Message, error)
}

type service struct {
	messageRepo         *base.Repository[Message]
}

func (s *service) SendMessage(msg *Message) (*Message, error) {
// 	err := msg.Validate()
// 	if err != nil {
// 		return nil, NewValidationError(err)
// 	}

	newMessage, err := s.messageRepo.Create(*msg)
	if err != nil {
		return nil, err
	}
	return newMessage, nil
}

func (s *service) RetrieveMessages(userID string) ([]Message, error) {

	messages, err := s.messageRepo.Get([]repository.Query{
		{
			Field:     "receiver_id",
			Operation: repository.EQUAL,
			Targets:   []string{userID},
		},
	})

	if err != nil {
		return nil, err
	}

    return messages, nil
}

func NewService() Service {
	return &service{
		messageRepo: &base.Repository[Message]{
			Url:    "http://localhost:8080",
			Client: api.NewHTTPClient(),
			Entity: Message{},
		},
	}
}
