package main

import (
	"log"
	"net/http"

	"github.com/Luckny/go-tracer"
	"github.com/gorilla/websocket"
)

type room struct {
	// Channel that holds incomming messages for the room
	msgQueue chan []byte

	// channel for clients joining the room
	join chan *client

	// chanell for clients leaving the room
	leave chan *client

	// Holds all active clients in this room
	clients map[*client]bool

	// Will trace this room's activity. Default's to off
	tracer tracer.Tracer
}

func newRoom() *room {
	return &room{
		msgQueue: make(chan []byte),
		join:     make(chan *client),
		leave:    make(chan *client),
		clients:  make(map[*client]bool),
		tracer:   tracer.Off(),
	}
}

func (r *room) run() {
	for {
		select {
		case client := <-r.join:
			// client joining the room
			r.clients[client] = true
			r.tracer.Trace("New client joined.")

		case client := <-r.leave:
			// client leaving the room
			delete(r.clients, client)
			// close the client's sending channel
			close(client.send)
			r.tracer.Trace("Client left.")

		// message in the msg in the queue
		case msg := <-r.msgQueue:
			// broadcast message to all clients
			for client := range r.clients {
				select {
				case client.send <- msg:
					// send the message
					r.tracer.Trace(" -- Message sent to client")
				default:
					// failed to send
					delete(r.clients, client)
					close(client.send)
					r.tracer.Trace(" -- Failed to send message, closing client")
				}
			}
		}
	}
}

var upgrader = &websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 256,
}

// A room is now a handler
func (r *room) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	// TODO: handle cross origin
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	socket, err := upgrader.Upgrade(w, req, nil)

	if err != nil {
		log.Fatal("ServeHTTP: ", err)
		return
	}

	client := &client{
		socket: socket,
		send:   make(chan []byte, 256),
		room:   r,
	}

	// add client to the room
	r.join <- client

	defer func() { r.leave <- client }()
	go client.write()
	client.read()
}
