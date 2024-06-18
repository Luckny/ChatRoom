import { Grid, List, ListItem, ListItemText } from '@mui/material';
import { MessageType } from '../../typing';

type MessageListProps = {
  messages: MessageType[];
  chatId: string;
};

export default function MessageList({ messages, chatId }: MessageListProps) {
  return (
    <List sx={{ height: '70vh', overflowY: 'auto' }}>
      {messages.map((msg) =>
        msg.id === chatId ? (
          //
          // Outgoing messages
          //
          <ListItem key={msg.id} sx={{ textAlign: 'right' }}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText primary={msg.message} />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  secondary={`me @ ${msg.when.toLocaleTimeString()}`}
                />
              </Grid>
            </Grid>
          </ListItem>
        ) : (
          //
          // Incomming messages
          //
          <ListItem key={msg.id}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText primary={msg.message} />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  secondary={`User1 @ ${msg.when.toLocaleTimeString()}`}
                />
              </Grid>
            </Grid>
          </ListItem>
        )
      )}
    </List>
  );
}
