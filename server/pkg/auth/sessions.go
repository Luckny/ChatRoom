package auth

import (
	"github.com/gorilla/sessions"
)

var UserSessionName = "user_session"

// all keys are strings, parsing is done internally
type SessionsOptions struct {
	Key    string
	MaxAge int
	// true if served over https
	HttpOnly bool
	// true if served over https
	Secure bool
}

func NewCoockieStore(options SessionsOptions) *sessions.CookieStore {
	store := sessions.NewCookieStore([]byte(options.Key))

	store.MaxAge(options.MaxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = options.HttpOnly
	store.Options.Secure = options.Secure

	return store
}
