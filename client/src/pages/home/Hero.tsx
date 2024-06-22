import { Box, Button, Typography } from '@mui/material';

export default function Hero() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="40vh"
      flexDirection="column"
    >
      <Typography
        variant="h2"
        noWrap
        sx={{
          //   display: { xs: 'flex', md: 'none' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
        }}
      >
        Welcome to LinkUp!
      </Typography>
      <Typography
        variant="body1"
        // noWrap
        sx={{
          //   display: { xs: 'flex', md: 'none' },
          width: '60%',
          textAlign: 'center',
          // fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
        }}
      >
        Join the ultimate online experience with real-time anonymous chat rooms.
      </Typography>
      <Typography
        variant="body1"
        sx={{
          //   display: { xs: 'flex', md: 'none' },
          textAlign: 'center',
          width: '60%',
          // fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
        }}
      >
        Create your space, invite friends, and explore communities - all with
        privacy and freedom.
      </Typography>
      <Button
        color="inherit"
        className="bg-gray-100 hover:bg-gray-200 font-medium rounded-full text-sm px-5 py-2.5 ml-2 mt-2"
      >
        Join Now
      </Button>
    </Box>
  );
}
