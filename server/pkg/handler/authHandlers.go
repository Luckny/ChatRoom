package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/go-chi/chi"
	"github.com/markbates/goth/gothic"
)

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	// we need the following 2 lines because of this issue:
	// https://github.com/markbates/goth/issues/264
	provider := chi.URLParam(r, "provider")
	r = r.WithContext(context.WithValue(context.Background(), "provider", provider))

	if user, err := gothic.CompleteUserAuth(w, r); err == nil {
		tracer.Trace("User already authenticated ", user.Email)
		http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
	} else {
		tracer.Trace("User not authenticated, starting auth process.")
		gothic.BeginAuthHandler(w, r)
	}
}

func (h *Handler) HandleAuthCallback(w http.ResponseWriter, r *http.Request) {
	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		fmt.Fprintln(w, err)
		return
	}
	// set the user session
	err = h.auth.StoreUserSession(w, r, user)
	if err != nil {
		tracer.Trace("Could not set user session ", err.Error())
		return
	}
	tracer.Trace(user.Email)
	tracer.Trace("Completed user auth from callback")
	http.Redirect(w, r, "http://localhost:5173", http.StatusFound)
}

func (h *Handler) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	w.Header().Set("Content-Type", "application/json")
	session, err := h.auth.GetUserSession(r)

	if err != nil {
		tracer.Trace("Could not get user:  ", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	user := &auth.User{Email: session.Email}
	json.NewEncoder(w).Encode(user)
}
