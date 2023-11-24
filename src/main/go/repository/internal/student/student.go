package student

import (
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"repository/internal/institutionuser"
)

type ProgramType string
type Period string

const (
	ProgramTypeGraduation    ProgramType = "GRADUATION"
	ProgramTypePostGradution ProgramType = "POSTGRADUATION"
)

const (
	Morning  Period = "MATUTINO"
	Daytime  Period = "DIURNO"
	Nocturne Period = "NOTURNO"
)

type Student struct {
	ID                string `json:"id" param:"id" gorm:"primarykey"`
	InstitutionUserID string `json:"institution_user_id" gorm:"uniqueIndex:compositeindex;index;not null"`
	InstitutionUser   institutionuser.
				InstitutionUser `json:"-" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ProgramType ProgramType `json:"program_type"`
	Course      string      `json:"course"`
	IngressYear string      `json:"ingress_year"`
	Period      Period      `json:"period"`
}

func (s *Student) SetID(id string) {
	s.ID = id
}

func (s *Student) Columns() []string {
	return []string{"id", "institution_user_id", "program_type", "course", "ingress_year",
		"period"}
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

	err := migrator.AutoMigrate(student)
	if err != nil {
		log.Printf("Error while migrating table: %v", err)
	}
}
