package handler

import "github.com/Luckny/LinkUp/pkg/auth"

type Handler struct {
	auth *auth.AuthService
}

func New(auth *auth.AuthService) *Handler {
	return &Handler{auth: auth}
}
