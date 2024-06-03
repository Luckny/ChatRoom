
export default class Socket {
  private socket: WebSocket

  constructor() {
    this.socket = new WebSocket("ws://localhost:8080/room")
  }

  connect = () => {
    console.log("Trying to connect.")

    this.socket.onopen = () => {
      console.log("Connection is now openend!")
    }

    this.socket.onmessage = (msg: MessageEvent<string>) => {
      const { data } = msg
      console.log("New message: ", data)
    }

    this.socket.onclose = (event: Event) => {
      console.log("Socket connection closed. ", event)
    }

    this.socket.onerror = (error: Event) => {
      console.log("Socket error: ", error)
    }
  }

  /**
  * Send message over a websocket connection
  *
  * @param msg message to send
  */
  sendMessage = (msg: string) => {
    console.log("Sending message: ", msg)
    this.socket.send(msg)
  }
}
