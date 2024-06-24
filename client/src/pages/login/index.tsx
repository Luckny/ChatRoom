import { Avatar, Divider, Grid, Paper, Typography } from '@mui/material';

import { LockOutlined } from '@mui/icons-material';
import SocialLogin from './SocialLogin';

export default function Login() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '60vh' }}
      maxWidth="xs"
    >
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          width: '30%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography
          variant="h5"
          noWrap
          sx={{
            //   display: { xs: 'flex', md: 'none' },
            textAlign: 'center',
            // fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
          }}
        >
          Sign in to LinkUp
        </Typography>

        <SocialLogin />

        <Divider sx={{ width: '100%', bgcolor: 'black', marginY: 2 }} />
        {/* <CredentialsLogin /> */}
        {/* <Typography */}
        {/*   variant="body1" */}
        {/*   noWrap */}
        {/*   sx={{ */}
        {/*     textAlign: 'center', */}
        {/*     color: 'inherit', */}
        {/*   }} */}
        {/* > */}
        {/*   {`Don't have an account? `} */}
        {/*   <a href="/">Sign up</a> */}
        {/* </Typography> */}
      </Paper>
    </Grid>
  );
}
