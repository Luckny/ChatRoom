import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { ChangeEvent, SyntheticEvent, useState } from "react";
import useSocketContext from "../../context/websocket/useSocketContext";

export default function MessageBox() {
  const [message, setMessage] = useState<string>("")
  const { messages, sendMessage } = useSocketContext()
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    sendMessage(message)
  }
  return (

    <Grid item xs={9}>
      <List sx={{ height: '70vh', overflowY: 'auto' }}>
        <ListItem key="1">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary={messages[0]}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="User1 @ 09:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary={messages[1]}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="User2 @ 09:31"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3" sx={{ textAlign: 'right' }}>
          <Grid container>
            <Grid item xs={12}>
              <ListItemText primary={messages[2]}></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText secondary="me @ 10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid component="form" onSubmit={handleSubmit} >
          <TextField id="outlined-basic-email" label="Type Something" fullWidth onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)} />
          <Fab color="primary" size="small" aria-label="add" type="submit"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}
