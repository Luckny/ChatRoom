package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Luckny/go-tracer"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
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

const (
	key    = "auth"
	maxAge = 86400 * 30 // 30 days
	isProd = false
)

func NewAuth() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading env file.", "-", err)
	}

	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
		google.New(googleClientId, googleClientSecret, "http:/localhost:8080/auth/callback/google"),
	)
}

// loginHandler handles the third-party login process.
// format: /auth/{action}/{provider}
func loginHandler(w http.ResponseWriter, r *http.Request) {
	segs := strings.Split(r.URL.Path, "/")
	action := segs[2]
	// provider := segs[3]
	switch action {
	case "login":
		gothic.BeginAuthHandler(w, r)
	case "callback":

	default:
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Auth action %s not supported", action)
	}
}
