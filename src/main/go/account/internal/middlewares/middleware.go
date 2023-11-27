package server

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"strings"
)

func TokenHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		checkToken(c)
		c.Next()
	}
}

func checkToken(c *gin.Context) {
	bearerToken := c.Request.Header.Get("Authorization")
	token := strings.Split(bearerToken, " ")
	if len(token) != 2 || token[0] != "Bearer" {
		c.AbortWithStatusJSON(401, gin.H{"error": "Unauthorized"})
		return
	}
	bearerToken = token[0]

	jwt.Parse()
