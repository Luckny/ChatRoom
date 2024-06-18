import { ChangeEvent, SyntheticEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { Fab, Grid, TextField } from '@mui/material';

type InputProps = {
  onSubmit: (event: SyntheticEvent) => void;
  addMessage: (message: string) => void;
};

export default function MessageInput({ onSubmit, addMessage }: InputProps) {
  return (
    <Grid container style={{ padding: '20px' }}>
      <Grid component="form" onSubmit={onSubmit}>
        <TextField
          id="outlined-basic-email"
          label="Type Something"
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            addMessage(event.target.value)
          }
        />
        <Fab color="primary" size="small" aria-label="add" type="submit">
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}
