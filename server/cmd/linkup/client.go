package main

import (
	"github.com/gorilla/websocket"
)

// A client represents a single chatting user
type client struct {
	// web socket for this client
	socket *websocket.Conn

	// channel on wich message are sent
	send chan []byte

	// Client's current room
	room *room
}

// Read messages from the message queue channel
func (c *client) read() {
	// not sure if defer is better here
	// defer c.socket.Close()
	for {
		_, msg, err := c.socket.ReadMessage()
		if err != nil {
			// TODO: handle read message error
			break
		}
		// add the message to the queue
		c.room.msgQueue <- msg
	}

	c.socket.Close()
}

// write messages that are in the send channel to the websocket
func (c *client) write() {
	for msg := range c.send {
		err := c.socket.WriteMessage(websocket.TextMessage, msg)

		if err != nil {
			// TODO: handle write message error
			break
		}
	}

	c.socket.Close()
}
