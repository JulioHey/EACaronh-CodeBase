package middlewares

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"strings"
)

type TokenStruct struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	jwt.StandardClaims
}

func TokenHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		checkToken(c)
		c.Next()
	}
}

func checkToken(c *gin.Context) {
	claims, err := extractToken(c)
	if err != nil {
		c.AbortWithStatusJSON(401, gin.H{"error": err.Error()})
		return
	}
	err = addUserIDToURL(c, claims)
	if err != nil {
		c.AbortWithStatusJSON(401, gin.H{"error": err.Error()})
	}
	c.Next()
}

func extractToken(c *gin.Context) (jwt.MapClaims, error) {
	bearerToken := c.Request.Header.Get("Authorization")
	token := strings.Split(bearerToken, " ")
	if len(token) != 2 || token[0] != "Bearer" {
		return nil, errors.New("invalid token")
	}
	bearerToken = token[1]
	tokenstruct, err := jwt.Parse(bearerToken,
		func(token *jwt.Token) (interface{},
			error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v",
					token.Header["alg"])
			}
			return []byte("secret"), nil
		})

	if err != nil {
		return nil, err
	}

	claims, ok := tokenstruct.Claims.(jwt.MapClaims)
	if !ok || !tokenstruct.Valid {
		return nil, errors.New("error with claims")
	}
	return claims, nil
}

func addUserIDToURL(c *gin.Context, claims jwt.MapClaims) error {
	userID, ok := claims["user_id"]
	if !ok {
		return errors.New("invalid token")
	}
	if c.Request.URL.RawQuery != "" {
		c.Request.URL.RawQuery += "&"
	}
	c.Request.URL.RawQuery += fmt.Sprintf("user_id=%v", userID)
	return nil
}
