package chat

import (
	"time"

	"github.com/Luckny/LinkUp/pkg/tracer"
	"github.com/gorilla/websocket"
)

// A client represents a single chatting user
type Client struct {
	Id string
	// web socket for this client
	Socket *websocket.Conn

	// channel on wich message are sent
	Send chan *Message

	// Client's current room
	ChatRoom *ChatRoom
}

// Read messages from the message queue channel
func (c *Client) Read() {
	for {
		var msg *Message
		err := c.Socket.ReadJSON(&msg)
		if err != nil {
			// TODO: handle read message error
			break
		}

		msg.When = time.Now()
		msg.Id = c.Id
		// add the message to the queue
		c.ChatRoom.MsgQueue <- msg
	}

	c.Socket.Close()
}

// write messages that are in the send channel to the websocket
func (c *Client) Write() {
	for msg := range c.Send {
		if c.Id == msg.Id {
			tracer.Trace("outgoing message for ", c.Id)
		}
		err := c.Socket.WriteJSON(msg)
		// err := c.socket.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			// TODO: handle write message error
			break
		}
	}

	c.Socket.Close()
}
