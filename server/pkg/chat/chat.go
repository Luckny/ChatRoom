package chat

import (
	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/google/uuid"
)

type ChatRoom struct {
	Id   string  `json:"id"`
	Name *string `json:"name"`

	// Channel that holds incomming messages for the room
	MsgQueue chan *Message `json:"-"`

	// channel for clients joining the room
	Join chan *Client `json:"-"`

	// chanell for clients leaving the room
	Leave chan *Client `json:"-"`

	// Holds all active clients in this room
	Clients map[*Client]bool `json:"-"`
}

func NewChatRoom() *ChatRoom {
	return &ChatRoom{
		Id:       uuid.New().String(),
		MsgQueue: make(chan *Message),
		Join:     make(chan *Client),
		Leave:    make(chan *Client),
		Clients:  make(map[*Client]bool),
	}
}

func (chatRoom *ChatRoom) Run() {
	for {
		select {
		case client := <-chatRoom.Join:
			// client joining the room
			chatRoom.Clients[client] = true
			tracer.Trace("New client joined. ", client.Id)

		case client := <-chatRoom.Leave:
			// client leaving the room
			delete(chatRoom.Clients, client)
			// close the client's sending channel
			close(client.Send)
			tracer.Trace("Client left.")

		// message in the msg in the queue
		case msg := <-chatRoom.MsgQueue:
			// broadcast message to all clients
			for client := range chatRoom.Clients {
				if msg.Type == "handshake" && msg.Id != client.Id {
					continue
				}
				select {
				case client.Send <- msg:
					// send the message
					tracer.Trace(" -- Message sent to client ", client.Id)
				default:
					// failed to send
					delete(chatRoom.Clients, client)
					close(client.Send)
					tracer.Trace(" -- Failed to send message, closing client")
				}
			}
		}
	}
}
