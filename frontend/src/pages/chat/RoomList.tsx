import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material";

export default function RoomList() {
  return (
    <Grid item xs={3} sx={{ borderRight: '1px solid #e0e0e0' }}>
      <List>
        <ListItem key="Room 1">
          <ListItemIcon>
            <Avatar alt="Room 1" src="" />
          </ListItemIcon>
          <ListItemText primary="Room 1"></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Grid item xs={12} style={{ padding: '10px' }}>
        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
      </Grid>
      <Divider />
      <List>
        <ListItem key="Room 2">
          <ListItemIcon>
            <Avatar alt="Room 2" src="" />
          </ListItemIcon>
          <ListItemText primary="Room 2"></ListItemText>
        </ListItem>
        <ListItem key="Room 3">
          <ListItemIcon>
            <Avatar alt="Room 3" src="" />
          </ListItemIcon>
          <ListItemText primary="Room 3"></ListItemText>
        </ListItem>
      </List>
    </Grid >
  )
}
