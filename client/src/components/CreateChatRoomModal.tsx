import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import axios from 'axios';
import { useState } from 'react';

export default function BasicModalDialog({ open, setOpen }: any) {
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await axios('http://localhost:8080/test', {
        method: 'post',
        data: JSON.stringify({ Name: roomName, Description: roomDescription }),
        withCredentials: true,
      });
      console.log('no res');
      console.log(res);
      // eslint-disable-next-line no-console
      setOpen(false);
    } catch (e) {
      console.log('error createing room ', e);
    }
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <DialogTitle>Create new Chat Room</DialogTitle>
        <DialogContent>Fill in the information of the room.</DialogContent>
        <form>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input
                onChange={(e) => setRoomName(e.target.value)}
                autoFocus
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                onChange={(e) => setRoomDescription(e.target.value)}
                required
              />
            </FormControl>
            <Button
              type="submit"
              // color="inherit"
              sx={{
                backgroundColor: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,.9)',
                },
              }}
              onClick={handleSubmit}
            >
              Create Room
            </Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  );
}
