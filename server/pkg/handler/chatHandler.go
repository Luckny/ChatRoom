package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/Luckny/LinkUp/pkg/chat"
	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

var upgrader = &websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 256,
}

func (h *Handler) CreateChatRoom(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 1048576)
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	chatRoom := chat.NewChatRoom()
	// var room chat.ChatRoom
	err := dec.Decode(&chatRoom)
	if err != nil {
		// TODO: handle error like this-> https://www.alexedwards.net/blog/how-to-properly-parse-a-json-request-body
		tracer.Trace("Error decoding json ", err)
	}

	h.Add(chatRoom)
	chatRoom.Run()
}

func (h *Handler) ListRooms(w http.ResponseWriter, r *http.Request) {
	tracer.Trace("Todo implement list rooms")
}

// TODO: get room id from url instead of h.rooms[0]

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
		ChatRoom: h.rooms[0],
	}
	socket.WriteJSON(&chat.Message{Id: clientId.String(), Type: "handshake"})

	// add client to the room
	h.rooms[0].Join <- client

	defer func() { h.rooms[0].Leave <- client }()
	go client.Write()
	client.Read()
}
