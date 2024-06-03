import { createContext, ReactNode, useEffect, useState } from "react";

export type SocketType = {
  sendMessage: (message: string) => void;
}

interface ISocketProvider {
  children: ReactNode
}
export const SocketContext = createContext<SocketType | undefined>(undefined)

export const SocketProvider = ({ children }: ISocketProvider) => {
  const [webSocket, setWebsocket] = useState<WebSocket | null>(null)


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/room")

    ws.onopen = () => {
      console.log("Web Socket connection opened.")
    }

    ws.onclose = () => {
      console.log("Web Socked connection closed.")
    }

    ws.onmessage = (message: MessageEvent) => {
      console.log(message.data)
    }
    setWebsocket(ws)
  }, [])


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
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  )
}
