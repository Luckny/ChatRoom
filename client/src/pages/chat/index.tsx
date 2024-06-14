import { Container, Grid, Paper, Typography } from '@mui/material';
import MessageBox from './MessageBox';
import RoomList from './RoomList';
import { useAuth, useAuthRedirect } from '../../hooks/auth';

export default function Chat() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} sx={{ width: '100%', height: '100%' }}>
        <RoomList />
        <MessageBox />
      </Grid>
    </Container>
  );
}
