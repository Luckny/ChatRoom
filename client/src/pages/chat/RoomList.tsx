import { Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import { RoomType } from '../../typing';
import useSocket from '../../hooks/socket';

type RoomListProps = {
  rooms: RoomType[];
  currentRoomId: string | null;
  setCurrentRoomId: (roomId: string) => void;
};

export default function RoomList({
  rooms,
  currentRoomId,
  setCurrentRoomId,
}: RoomListProps) {
  const { setSocketUrl } = useSocket();
  const handleSelectRoom = (room: RoomType) => {
    setCurrentRoomId(room.id);
    setSocketUrl(`http://localhost:8080/room/${room.id}`);
  };

  return (
    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
      <Grid item xs={12} style={{ padding: '10px' }}>
        <TextField
          id="outlined-basic-email"
          label="Search"
          variant="outlined"
          fullWidth
        />
      </Grid>
      {/* <Divider /> */}
      <List>
        {rooms.map((room) => (
          <ListItem key={room.id}>
            {/* <ListItemIcon> */}
            {/*   <Avatar alt="Room 1" src="" /> */}
            {/* </ListItemIcon> */}
            <ListItemText
              onClick={() => handleSelectRoom(room)}
              primary={room.name}
            />
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
      {/* <List> */}
      {/*   <ListItem key="Room 2"> */}
      {/*     <ListItemIcon> */}
      {/*       <Avatar alt="Room 2" src="" /> */}
      {/*     </ListItemIcon> */}
      {/*     <ListItemText primary="Room 2" /> */}
      {/*   </ListItem> */}
      {/*   <ListItem key="Room 3"> */}
      {/*     <ListItemIcon> */}
      {/*       <Avatar alt="Room 3" src="" /> */}
      {/*     </ListItemIcon> */}
      {/*     <ListItemText primary="Room 3" /> */}
      {/*   </ListItem> */}
      {/* </List> */}
    </Grid>
  );
}
