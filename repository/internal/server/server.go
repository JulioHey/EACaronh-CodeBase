package server

import (
	"errors"
	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"net/http"
	"repository/internal/repository"
)

type Server[T repository.Model] struct {
	Service repository.Service[T]
}

func (s *Server[T]) Create(c echo.Context) error {
	newUser := new(T)

	err := c.Bind(newUser)

	if err != nil {
		log.Printf("Error while binding user model: %v", err)
		return err
	}

	newUserT, err := s.Service.Create(*newUser)

	if err != nil {
		log.Printf("Error while creating user: %v", err)
		return err
	}

	return c.JSON(http.StatusCreated, newUserT)
}

func (s *Server[T]) GetByID(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		log.Printf("Error while getting user by Id, missing id param")
		return echo.ErrBadRequest
	}

	log.Printf("Getting user by id: %v", id)

	user, err := s.Service.GetById(id)
	if err != nil {
		log.Printf("Error while getting user: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		}
		return err
	}

	return c.JSON(http.StatusOK, user)
}

func (s *Server[T]) Get(c echo.Context) error {
	users, err := s.Service.Get()

	if err != nil {
		log.Printf("Error while getting users: %v", err)
		return err
	}
	return c.JSON(http.StatusOK, users)
}

func (s *Server[T]) Update(c echo.Context) error {
	id := c.Param("id")
	if id == "" {
		log.Printf("Error while getting user by Id, missing id param")
		return echo.ErrBadRequest
	}

	newUser := new(T)

	err := c.Bind(newUser)

	if err != nil {
		log.Printf("Error while binding user model: %v", err)
		return err
	}
	newUserT := *newUser
	newUserT.SetID(id)

	log.Printf("Updating user: %+v", newUserT)

	err = s.Service.Update(newUserT)
	if err != nil {
		log.Printf("Error while binding user model: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		}
		return err
	}

	return c.JSON(http.StatusAccepted, map[string]string{"message": "User updated"})
}

func (s *Server[T]) Delete(c echo.Context) error {
	id := c.Param("id")

	if id == "" {
		log.Printf("Error while getting user by Id, missing id param")
		return echo.ErrBadRequest
	}

	log.Printf("Getting user by id: %v", id)
	err := s.Service.Delete(id)

	if err != nil {
		log.Printf("Error while deleting user: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		}
		return err
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "User deleted"})
}
