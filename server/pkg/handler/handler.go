package handler

import (
	"net/http"

	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/Luckny/LinkUp/pkg/chat"
)

type Handler struct {
	auth *auth.AuthService
	chat *chat.ChatService
}

func New(auth *auth.AuthService, chat *chat.ChatService) *Handler {
	return &Handler{auth: auth, chat: chat}
}

func (h *Handler) WithCors(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Content-Type", "application/json")
		next(w, r)
	}
}
