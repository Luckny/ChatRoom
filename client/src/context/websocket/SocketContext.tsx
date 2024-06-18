import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ChildrenType, MessageType } from '../../typing';

export type SocketType = {
  messages: MessageType[];
  sendMessage: (message: string) => void;
  chatId: string;
};

export const SocketContext = createContext<SocketType | undefined>(undefined);

export function SocketProvider({ children }: ChildrenType) {
  // State
  const [webSocket, setWebsocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatId, setChatId] = useState('');

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/linkup`);

    ws.onopen = () => {
      console.log('Web Socket connection opened.');
    };

    ws.onclose = () => {
      console.log('Web Socked connection closed.');
    };

    setWebsocket(ws);
  }, []);

  if (webSocket) {
    webSocket.onmessage = (event: MessageEvent) => {
      // create the message element
      const data = JSON.parse(event.data);
      const message: MessageType = {
        id: data.Id,
        message: data.Text,
        when: new Date(data.When),
        type: data.Type,
      };

      if (message.type === 'handshake') {
        localStorage.setItem('chatId', message.id);
        setChatId(message.id);
      } else {
        // add the message to the array
        setMessages([...messages, message]);
      }
    };
  }

  /**
   * Send a message over the websocket connection.
   * @param message: The message to send.
   */
  const sendMessage = useCallback(
    (message: string) => {
      const data = { Text: message };
      if (webSocket) {
        webSocket.send(JSON.stringify(data));
      }
    },
    [webSocket]
  );

  const value = useMemo(() => {
    return {
      messages,
      sendMessage,
      chatId,
    };
  }, [messages, sendMessage, chatId]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
