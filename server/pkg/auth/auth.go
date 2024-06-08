package auth

import (
	"fmt"
	"net/http"
	"os"

	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

type AuthService struct {
}

func NewAuthService(store sessions.Store) *AuthService {

	gothic.Store = store

	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")

	goth.UseProviders(
		google.New(
			googleClientId,
			googleClientSecret,
			buildCallbackURL("google"),
		),
	)

	return &AuthService{}
}

func (authService *AuthService) StoreUserSession(
	w http.ResponseWriter,
	r *http.Request,
	user goth.User,
) error {
	session, _ := gothic.Store.Get(r, UserSessionName)
	// Set some session values.
	session.Values["user"] = user

	// Save it before we write to the response/return from the handler.
	err := session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return err
	}

	return nil
}

func (AuthService *AuthService) GetUserSession(r *http.Request) (goth.User, error) {

	session, err := gothic.Store.Get(r, UserSessionName)

	if err != nil {
		return goth.User{}, err
	}

	user := session.Values["user"]
	if user == nil {
		return goth.User{}, fmt.Errorf("user is not authenticated! %v", user)
	}

	return user.(goth.User), nil

}

func MustAuth(next http.Handler, auth *AuthService) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		session, err := auth.GetUserSession(r)
		if err != nil {
			tracer.Trace("User is not authenticated. (redirecting to login)")
			http.Redirect(w, r, "/login", http.StatusTemporaryRedirect)
			return
		}

		tracer.Trace("User is authenticated. user: ", session.Name)
		next.ServeHTTP(w, r)
	}

}

func buildCallbackURL(provider string) string {
	return fmt.Sprintf("http://localhost:8080/auth/%s/callback", provider)
}