import { Avatar, Button, Grid, Paper, Typography } from '@mui/material';

import { LockOutlined } from '@mui/icons-material';

export default function Login() {
  // const handleClick = () => {
  //   try {
  //     axios.get('http://localhost:8080/auth/google');
  //   } catch (e) {
  //     // eslint-disable-next-line no-console
  //     console.log('Error with sign in');
  //   }
  // };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
      maxWidth="xs"
    >
      <Paper elevation={3} sx={{ padding: 3, display: 'flex' }}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar>
            <LockOutlined />
          </Avatar>
          <Typography component="h2">
            Select teh service you would like to sign in with
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            href="http://localhost:8080/auth/google"
          >
            Sign in with Google
          </Button>
          {/* <Button */}
          {/*   // disabled={isLoading} */}
          {/*   type="submit" */}
          {/*   fullWidth */}
          {/*   variant="contained" */}
          {/*   sx={{ mb: 1 }} */}
          {/* > */}
          {/*   Sign in with Facebook */}
          {/* </Button> */}
          {/* <Button */}
          {/*   // disabled={isLoading} */}
          {/*   type="submit" */}
          {/*   fullWidth */}
          {/*   variant="contained" */}
          {/*   sx={{ mb: 1 }} */}
          {/* > */}
          {/*   Sign in with GitHub */}
          {/* </Button> */}
        </Grid>
      </Paper>
    </Grid>
  );
}
