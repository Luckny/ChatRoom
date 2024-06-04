package main

import (
	"log"
	"net/http"
	"os"

	"github.com/Luckny/go-tracer"
	"github.com/joho/godotenv"
)

type authHandler struct {
	// The next handler in the chain
	next http.Handler
}

// ServeHTTP handles HTTP requests for authentication.
// If the "auth" cookie is missing, it redirects the user to the login page.
func (h *authHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	tracer := tracer.New(os.Stdout)

	authHeader := r.URL.Query().Get("token")

	tracer.Trace("The token: ", authHeader)

	// TODO: handle token
	// made it through the auth gard
	h.next.ServeHTTP(w, r)
}

func MustAuth(handler http.Handler) http.Handler {
	return &authHandler{next: handler}
}

func NewAuth() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading env file.", "-", err)
	}

	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	log.Println(googleClientId, googleClientSecret)

}
