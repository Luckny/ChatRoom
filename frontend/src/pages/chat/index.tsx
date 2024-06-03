import { Container, Grid, Paper, Typography } from "@mui/material";
import FriendList from "./FriendList";
import MessageBox from "./MessageBox";


export default function Chat() {

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} sx={{ width: '100%', height: '100%' }}>
        <FriendList />
        <MessageBox />
      </Grid>
    </Container>
  );
}

