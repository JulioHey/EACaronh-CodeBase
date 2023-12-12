package server

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
	"gorm.io/gorm"
	"net/http"
	"repository/internal/repository"
	"repository/internal/service"
)

type GetRequest struct {
	Queries []repository.Query `json:"queries"`
}

type BaseServer[T repository.Model] struct {
	Name    string
	Service service.Service[T]
}

func (s *BaseServer[T]) Create(c *gin.Context) {
	newEntity := new(T)

	err := c.Bind(newEntity)

	if err != nil {
		log.Printf("Error while binding entity model: %v", err)
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Invalid entity model"})
		return
	}

	newEntityT, err := s.Service.Create(*newEntity)

	if err != nil {
		log.Printf("Error while creating entity: %v", err)
		c.JSON(http.StatusBadRequest,
			map[string]string{"message": "Unexpected error"})
		return
	}

	c.JSON(http.StatusCreated, newEntityT)
}

func (s *BaseServer[T]) GetByID(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		log.Printf("Error while getting entity by Id, missing id param")
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Missing id param"})
		return
	}

	log.Printf("Getting entity by id: %v", id)

	entity, err := s.Service.GetById(id)
	if err != nil {
		log.Printf("Error while getting entity: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound,
				map[string]string{"message": "Entity not found"})
		} else {
			c.JSON(http.StatusBadRequest,
				map[string]string{"message": "Unexpected error"})
		}
		return
	}

	c.JSON(http.StatusOK, entity)
}

func (s *BaseServer[T]) Get(c *gin.Context) {
	var entities []T
	req := new(GetRequest)
	err := c.Bind(&req)

	if err != nil {
		log.Printf("Error while binding queries: %v", err)
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Query is invalid"})
		return
	}

	entities, err = s.Service.Get(req.Queries)

	if err != nil {
		log.Printf("Error while getting entities: %v", err)
		var er repository.ColumnNotFoundErr
		if errors.As(err, &er) {
			c.JSON(http.StatusBadRequest,
				map[string]string{"message": er.Error()})
		} else {
			log.Printf("Error while getting entities: %v", err)
			c.JSON(http.StatusBadRequest,
				map[string]string{"message": "Unexpected error"})
		}
		return
	}

	c.JSON(http.StatusOK, entities)
}

func (s *BaseServer[T]) Update(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		log.Printf("Error while getting entity by Id, missing id param")
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Missing id param"})
		return
	}

	newEntity := new(T)

	err := c.Bind(newEntity)

	if err != nil {
		log.Printf("Error while binding entity model: %v", err)
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Missing id param"})
		return
	}
	newEntityT := *newEntity
	newEntityT.SetID(id)

	log.Printf("Updating entity: %+v", newEntityT)

	err = s.Service.Update(newEntityT)
	if err != nil {
		log.Printf("Error while updating entity model: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		} else {
			c.JSON(http.StatusBadRequest,
				map[string]string{"message": "Unexpected error"})
		}
		return
	}

	c.JSON(http.StatusAccepted, map[string]string{"message": "User updated"})
}

func (s *BaseServer[T]) Delete(c *gin.Context) {
	id := c.Param("id")

	if id == "" {
		log.Printf("Error while getting entity by Id, missing id param")
		c.JSON(http.StatusUnprocessableEntity,
			map[string]string{"message": "Missing id param"})
		return
	}

	log.Printf("Getting entity by id: %v", id)
	err := s.Service.Delete(id)

	if err != nil {
		log.Printf("Error while deleting entity: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, map[string]string{"message": "User not found"})
		} else {
			c.JSON(http.StatusBadRequest,
				map[string]string{"message": "Unexpected error"})
		}
		return
	}

	c.JSON(http.StatusOK, map[string]string{"message": "Entity deleted"})
}
