package institution

type CheckInstitutionRequest struct {
	Email           string `json:"email"`
	InstitutionName string `json:"institution_name"`
}

type Institution struct {
	Domain string `json:"domain"`
	Name   string `json:"name"`
}
