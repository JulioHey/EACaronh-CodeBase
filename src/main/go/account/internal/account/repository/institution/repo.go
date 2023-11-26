package institution

import (
	"account/internal/account/api"
	"account/internal/account/repository"
	"encoding/json"
	"fmt"
)

type Repo interface {
	GetInstitutionByName(domain string) (*Institution, error)
}

type repo struct {
	url    string
	client api.HttpClientInterface
}

func (r *repo) GetInstitutionByName(name string) (*Institution, error) {
	queries := []repository.Query{
		{
			Field:     "name",
			Operation: repository.EQUAL,
			Targets:   []string{name},
		},
	}

	req := map[string]interface{}{
		"queries": queries,
	}

	fullURL := fmt.Sprintf("%s/institution/", r.url)

	res, err := r.client.Put(fullURL, req)

	if err != nil {
		return nil, err
	}

	if res.StatusCode != 200 {
		return nil, repository.NewNotFoundError("institution")
	}

	var institutions []Institution
	err = json.Unmarshal(res.Msg, &institutions)

	if err != nil {
		return nil, err
	}

	if len(institutions) == 0 {
		return nil, repository.NewNotFoundError("institution")
	}
	return &institutions[0], nil
}

func NewRepo(url string, client api.HttpClientInterface) Repo {
	return &repo{
		url:    url,
		client: client,
	}
}
