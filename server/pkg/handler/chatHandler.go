package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"slices"

	"github.com/Luckny/LinkUp/pkg/chat"
	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/go-chi/chi"
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
		return
	}

	h.Add(chatRoom)
	// TODO: run in due time only
	// chatRoom.Run()
	w.WriteHeader(http.StatusOK)

}

func (h *Handler) ListRooms(w http.ResponseWriter, r *http.Request) {
	err := json.NewEncoder(w).Encode(h.rooms)
	if err != nil {
		tracer.Trace("error encoding json ", err)
	}
}

// TODO: get room id from url instead of h.rooms[0]

// A room is now a handler
func (h *Handler) HandleChatRoom(w http.ResponseWriter, req *http.Request) {
	roomId := chi.URLParam(req, "id")
	idx := slices.IndexFunc(h.rooms, func(room *chat.ChatRoom) bool { return room.Id == roomId })
	room := h.rooms[idx]
	go room.Run()
	// TODO: handle cross origin
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	socket, err := upgrader.Upgrade(w, req, nil)

	if err != nil {
		log.Fatal("Error upgrading socket connection: ", err)
		return
	}

	clientId := uuid.New()

	client := &chat.Client{
		Id:       clientId.String(),
		Socket:   socket,
		Send:     make(chan *chat.Message, 256),
		ChatRoom: room,
	}
	socket.WriteJSON(&chat.Message{Id: clientId.String(), Type: "handshake"})

	// add client to the room
	room.Join <- client

	defer func() { h.rooms[0].Leave <- client }()
	go client.Write()
	client.Read()
}
