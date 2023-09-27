package institution

type Institution struct {
	ID    string `json:"id" param:"id" gorm:"primarykey"`
	Name  string `json:"name" gorm:"not null"`
	Email string `json:"email" gorm:"unique"`
}
