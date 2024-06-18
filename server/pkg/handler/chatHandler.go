package handler

import (
	"log"
	"net/http"

	"github.com/Luckny/LinkUp/pkg/chat"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var upgrader = &websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 256,
}

// A room is now a handler
func (h *Handler) HandleChatRoom(w http.ResponseWriter, req *http.Request) {
	// TODO: handle cross origin
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	socket, err := upgrader.Upgrade(w, req, nil)

	if err != nil {
		log.Fatal("ServeHTTP: ", err)
		return
	}

	clientId := uuid.New()

	client := &chat.Client{
		Id:       clientId.String(),
		Socket:   socket,
		Send:     make(chan *chat.Message, 256),
		ChatRoom: h.chat,
	}
	socket.WriteJSON(&chat.Message{Id: clientId.String(), Type: "handshake"})

	// add client to the room
	h.chat.Join <- client

	defer func() { h.chat.Leave <- client }()
	go client.Write()
	client.Read()
}
