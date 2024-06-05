package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/go-chi/chi"
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
func (h *authHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	tracer.Trace("Must auth middleware")
	// TODO: implement
	h.next.ServeHTTP(w, r)
}
func MustAuth(handler http.Handler) http.Handler {
	return &authHandler{next: handler}
}

const (
	key    = "9598A747FBEB66D294E7851AA57BE"
	maxAge = 86400 * 30 // 30 days
	isProd = false
)

func InitiateAuth() {
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
		google.New(
			googleClientId,
			googleClientSecret,
			"http://localhost:8080/auth/callback/google",
		),
	)
}

// loginHandler handles the third-party login process.
// format: /auth/{action}/{provider}
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	action := chi.URLParam(r, "action")

	// we need the following 2 lines because of this issue:
	// https://github.com/markbates/goth/issues/264
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(context.Background(), "provider", provider))

	switch action {
	case "login":
		if user, err := gothic.CompleteUserAuth(w, r); err == nil {
			tracer.Trace("Completed user auth from login")
			log.Println(user)
			http.Redirect(w, r, "http://localhost:3000", http.StatusFound)
		} else {
			tracer.Trace("Starting Auth process")
			gothic.BeginAuthHandler(w, r)
		}
	case "callback":
		user, err := gothic.CompleteUserAuth(w, r)
		if err != nil {
			fmt.Fprintln(w, err)
			return
		}
		log.Println(user)
		tracer.Trace("Completed user auth from callback")
		http.Redirect(w, r, "http://localhost:3000", http.StatusFound)

	default:
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprintf(w, "Auth action %s not supported", action)
	}
}
