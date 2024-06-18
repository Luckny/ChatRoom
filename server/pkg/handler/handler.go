package handler

import (
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
