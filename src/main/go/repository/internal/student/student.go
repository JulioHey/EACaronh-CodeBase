package student

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/institution"
	"repository/internal/user"
)

type Student struct {
	User               user.User               `json:"user_id" gorm:"primarykey;foreignKey:ID"`
	Institution        institution.Institution `json:"institituion_id" gorm:"primarykey;foreignKey:ID"`
	Course             string                  `json:"course"`
	IngressYear        string                  `json:"ingress_year"`
	Period             string                  `json:"period"`
	RegistrationNumber string                  `json:"registration_number"`
}

func (s *Student) SetID(id ...string) {
	s.User.SetID(id[0])
	s.Institution.SetID(id[0])
}

func (s *Student) Columns() []string {
	return []string{"user_id", "institution_id", "course", "ingress_year", "period", "registration_number"}
}

func AutoMigrateStudent(db *gorm.DB) {
	migrator := db.Migrator()
	student := &Student{}
	if false {
		err := migrator.DropTable(student)
		if err != nil {
			log.Printf("Error while dropping table: %v", err)
		}
	}
}
