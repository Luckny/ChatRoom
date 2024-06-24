import { Button } from '@mui/material';
import { LinkType } from '../../typing';

export default function ProviderButton({ name, href }: LinkType) {
  return (
    <Button
      className="bg-white text-black"
      variant="contained"
      sx={{ mt: 3, mb: 1 }}
      href={href}
    >
      {name}
    </Button>
  );
}
