import { createContext, ReactNode, useEffect, useState } from "react";

export type SocketType = {
  messages: string[];
  sendMessage: (message: string) => void;

}

interface ISocketProvider {
  children: ReactNode
}
export const SocketContext = createContext<SocketType | undefined>(undefined)

export const SocketProvider = ({ children }: ISocketProvider) => {
  const [webSocket, setWebsocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/room?token=mytoken`)

    ws.onopen = () => {
      console.log("Web Socket connection opened.")
    }

    ws.onclose = () => {
      console.log("Web Socked connection closed.")
    }

    setWebsocket(ws)
  }, [])

  if (webSocket)
    webSocket.onmessage = (message: MessageEvent) => {
      setMessages([...messages, message.data])
    }

  /**
   * Send a message over the websocket connection.
   * @param message: The message to send.
   */
  const sendMessage = (message: string) => {
    if (webSocket) {
      webSocket.send(message)
    }
  }

  return (
    <SocketContext.Provider value={{ messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}
