import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChildrenType } from '../../typing';

export type SocketType = {
  messages: string[];
  sendMessage: (message: string) => void;
};

export const SocketContext = createContext<SocketType | undefined>(undefined);

export function SocketProvider({ children }: ChildrenType) {
  const [webSocket, setWebsocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/room?token=mytoken`);

    ws.onopen = () => {
      console.log('Web Socket connection opened.');
    };

    ws.onclose = () => {
      console.log('Web Socked connection closed.');
    };

    setWebsocket(ws);
  }, []);

  if (webSocket)
    webSocket.onmessage = (message: MessageEvent) => {
      setMessages([...messages, message.data]);
    };

  /**
   * Send a message over the websocket connection.
   * @param message: The message to send.
   */
  const sendMessage = useCallback(
    (message: string) => {
      if (webSocket) {
        webSocket.send(message);
      }
    },
    [webSocket]
  );

  const value = useMemo(() => {
    return {
      messages,
      sendMessage,
    };
  }, [messages, sendMessage]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}