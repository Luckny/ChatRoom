package chat

import "time"

// represents a single message
type Message struct {
	Id   string
	Text string
	When time.Time
	Type string
}
