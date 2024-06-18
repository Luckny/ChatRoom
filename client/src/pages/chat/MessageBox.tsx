import { Divider, Grid } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import useSocket from '../../hooks/socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function MessageBox() {
  const [message, setMessage] = useState<string>('');

  const { messages, sendMessage, chatId } = useSocket();
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    sendMessage(message);
  };
  return (
    <Grid item xs={9}>
      <MessageList messages={messages} chatId={chatId} />
      <Divider />
      <MessageInput onSubmit={handleSubmit} addMessage={setMessage} />
    </Grid>
  );
}
