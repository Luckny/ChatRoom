import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import textingImg from '../../assets/imgs/texting.jpg';

export default function SideKick() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      maxHeight="50rem"
      flexDirection="column"
    >
      <Paper
        className="bg-gray-50"
        elevation={3}
        sx={{ padding: 3, width: '95%', display: 'flex' }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid item xs={4}>
            <Typography
              variant="h4"
              noWrap
              sx={{
                fontWeight: 700,
              }}
            >
              Unique Chat Rooms
            </Typography>
            <Typography
              variant="body1"
              sx={{
                width: '60%',
                letterSpacing: '.1rem',
                color: 'inherit',
              }}
            >
              Dive into diverse topics, connect with random strangers, and start
              conversations that matter to you or are completely meaningless! -
              all while staying anonymous.
            </Typography>
            <Button
              color="inherit"
              className="text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-full text-sm px-5 py-2.5 ml-2 mt-5"
            >
              Create a Room Now
            </Button>
          </Grid>

          <Grid item xs={8}>
            <img
              src={textingImg}
              alt="Texting man with grey hoodie"
              loading="lazy"
              className="h-auto w-full"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
