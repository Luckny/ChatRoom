import { Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MessageBox from './MessageBox';
import RoomList from './RoomList';
import { RoomType } from '../../typing';

export default function Chat() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // fetch room list
  useEffect(() => {
    async function fetchRoomList() {
      try {
        const res = await axios.get('http://localhost:8080/rooms', {
          withCredentials: true,
        });
        setRooms(res.data);
        // eslint-disable-next-line no-console
      } catch (e) {
        console.log('error fetching rooms ', e);
      }
    }

    fetchRoomList();
  }, []);

  return (
    <Container>
      <Grid
        container
        mt={2}
        component={Paper}
        sx={{ width: '100%', height: '100%' }}
      >
        <RoomList
          rooms={rooms}
          currentRoomId={currentRoomId}
          setCurrentRoomId={setCurrentRoomId}
        />
        <MessageBox currentRoomId={currentRoomId} />
      </Grid>
    </Container>
  );
}
