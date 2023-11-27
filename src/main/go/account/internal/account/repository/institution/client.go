package institution

import (
	"errors"
	"log"
	"strings"
)

type Client interface {
	CheckInstitution(req CheckInstitutionRequest) (string, error)
}

type client struct {
	repo Repo
}

func (c *client) CheckInstitution(req CheckInstitutionRequest) (string, error) {
	institution, err := c.repo.GetInstitutionByName(req.InstitutionName)

	if err != nil {
		return "", err
	}

	splittedEmail := strings.Split(req.Email, "@")[1]

	if splittedEmail != institution.Domain {
		log.Printf("email %s is not valid for institution %s", req.Email,
			institution.Domain)
		return "", errors.New("email is not valid")
	}

	return institution.ID, nil
}

func NewClient(repo Repo) Client {
	return &client{
		repo: repo,
	}
}
