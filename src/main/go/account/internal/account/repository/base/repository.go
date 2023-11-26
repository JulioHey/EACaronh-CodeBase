package base

import (
	"account/internal/account/api"
	"account/internal/account/repository"
	"encoding/json"
	"errors"
	"fmt"
)

type Model interface {
	GetPath() string
}

type Repository[T Model] struct {
	Url    string
	Client api.HttpClientInterface
	Entity T
}

func (r *Repository[T]) Create(entity T) (*T, error) {
	if r.Url == "" || r.Client == nil {
		return nil, repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	fullURL := fmt.Sprintf("%s/%s/", r.Url, r.Entity.GetPath())

	res, err := r.Client.Post(fullURL, entity)

	if err != nil {
		return nil, repository.NewCreationError("user", err)
	}

	if res.StatusCode != 201 {
		return nil, repository.NewCreationError("user",
			errors.New("status code not correct"))
	}

	var resEntity T
	err = json.Unmarshal(res.Msg, &resEntity)

	if err != nil {
		return nil, err
	}

	return &resEntity, nil
}

func (r *Repository[T]) GetByID(id string) (*T, error) {
	if r.Url == "" || r.Client == nil {
		return nil, repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	fullURL := fmt.Sprintf("%s/%s/%s", r.Url, r.Entity.GetPath(), id)

	res, err := r.Client.Get(fullURL, map[string]string{})

	if err != nil {
		return nil, repository.NewCreationError("user", err)
	}

	if res.StatusCode != 200 {
		return nil, repository.NewCreationError("user",
			errors.New("status code not correct"))
	}

	var resEntity T
	err = json.Unmarshal(res.Msg, &resEntity)

	if err != nil {
		return nil, err
	}

	return &resEntity, nil
}

func (r *Repository[T]) Update(id string, entity T) (*T, error) {
	if r.Url == "" || r.Client == nil {
		return nil, repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	fullURL := fmt.Sprintf("%s/%s/%s", r.Url, r.Entity.GetPath(), id)

	res, err := r.Client.Put(fullURL, entity)

	if err != nil {
		return nil, repository.NewCreationError("user", err)
	}

	if res.StatusCode != 202 {
		return nil, repository.NewCreationError(r.Entity.GetPath(),
			errors.New("status code not correct"))
	}

	var resEntity T
	err = json.Unmarshal(res.Msg, &resEntity)

	if err != nil {
		return nil, err
	}

	return &resEntity, nil
}

func (r *Repository[T]) Get(queries []repository.Query) ([]T, error) {
	if r.Url == "" || r.Client == nil {
		return nil, repository.NewCreationError("user",
			errors.New("url or client is empty"))
	}

	req := map[string]interface{}{
		"queries": queries,
	}

	fullURL := fmt.Sprintf("%s/%s/", r.Url, r.Entity.GetPath())

	res, err := r.Client.Put(fullURL, req)

	if err != nil {
		return nil, repository.NewCreationError("user", err)
	}

	if res.StatusCode != 200 {
		return nil, repository.NewCreationError("user",
			errors.New("status code not correct"))
	}

	var resEntities []T
	err = json.Unmarshal(res.Msg, &resEntities)

	if err != nil {
		return nil, err
	}

	return resEntities, nil
}
