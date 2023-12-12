package message

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/repository"
)

type Message struct {
	repository.Base
	SenderID          string                          `json:"sender_id"`
	ReceiverID        string                          `json:"receiver_id"`
	Content           string                          `json:"content"`
}

func (m *Message) Columns() []string {
	return []string{"id", "sender_id", "receiver_id", "content"}
}

func AutoMigrateMessage(db *gorm.DB) {
	migrator := db.Migrator()
	message := &Message{}
	if repository.ResetData {
		err := migrator.DropTable(message)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}

	err := migrator.AutoMigrate(message)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
