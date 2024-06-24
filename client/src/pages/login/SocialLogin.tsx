import { Grid } from '@mui/material';
import ProviderButton from './ProviderButton';

export default function SocialLogin() {
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Grid item xs={8}>
        <ProviderButton
          name="Google"
          href="http://localhost:8080/auth/google"
        />
      </Grid>
      <Grid item xs={8}>
        <ProviderButton
          name="Github"
          href="http://localhost:8080/auth/github"
        />
      </Grid>
    </Grid>
  );
}
