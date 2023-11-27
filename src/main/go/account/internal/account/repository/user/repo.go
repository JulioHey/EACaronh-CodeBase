package user

import (
	"account/internal/account/api"
	"account/internal/account/repository"
	"encoding/json"
	"errors"
	"fmt"
)

type Repo interface {
	CreateUser(req User) (string, error)
}

type repoImpl struct {
	url    string
	client api.HttpClientInterface
}

type InstitutionUserRepo struct {
	InstitutionID      string `json:"institution_id"`
	UserID             string `json:"user_id"`
	RegistrationNumber string `json:"registration_number"`
}

func (r *repoImpl) CreateUser(req User) (string, error) {
	if r.url == "" || r.client == nil {
		return "", repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	fullURL := fmt.Sprintf("%s/users/", r.url)

	res, err := r.client.Post(fullURL, req)

	if err != nil {
		return "", repository.NewCreationError("user", err)
	}

	if res.StatusCode != 201 {
		return "", repository.NewCreationError("user",
			errors.New("status code not correct"))
	}

	var resUser User
	err = json.Unmarshal(res.Msg, &resUser)

	if err != nil {
		return "", err
	}

	return resUser.ID, nil
}

func (r *repoImpl) CreateInstitutionUser(req InstitutionUser) (string,
	error) {
	if r.url == "" || r.client == nil {
		return "", repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	fullURL := fmt.Sprintf("%s/institution/", r.url)

	res, err := r.client.Post(fullURL, req)

	if err != nil {
		return "", repository.NewCreationError("user", err)
	}

	if res.StatusCode != 201 {
		return "", repository.NewCreationError("user",
			errors.New("status code not correct"))
	}

	var resUser User
	err = json.Unmarshal(res.Msg, &resUser)

	if err != nil {
		return "", err
	}

	return resUser.ID, nil
}

func NewRepo(url string, client api.HttpClientInterface) Repo {
	return &repoImpl{
		url:    url,
		client: client,
	}
}
