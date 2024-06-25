package handler

import (
	"net/http"

	"github.com/Luckny/LinkUp/pkg/auth"
	"github.com/Luckny/LinkUp/pkg/chat"
)

type Handler struct {
	auth  *auth.AuthService
	rooms []*chat.ChatRoom
}

func New(auth *auth.AuthService) *Handler {
	return &Handler{auth: auth}
}

func (h *Handler) Add(room *chat.ChatRoom) {
	h.rooms = append(h.rooms, room)
}

func (h *Handler) WithCors(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Content-Type", "application/json")
		next(w, r)
	}
}
