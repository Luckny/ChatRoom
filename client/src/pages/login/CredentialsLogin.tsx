import { Button, TextField } from '@mui/material';

export default function CredentialsLogin() {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />

      <Button
        className="bg-black "
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 1 }}
      >
        Sign in
      </Button>
      {/* Errors handling */}
    </>
  );
}
