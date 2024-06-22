import { Grid } from '@mui/material';
import Hero from './Hero';
import SideKick from './SideKick';

export default function Home() {
  return (
    <Grid container>
      <Hero />
      <SideKick />
    </Grid>
  );
}
