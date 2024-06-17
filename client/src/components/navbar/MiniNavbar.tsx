import { Typography } from '@mui/material';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import { NavbarPropsType } from '../../typing';

export default function MiniNavBar({
  pages,
  handleMenuItemClick,
}: NavbarPropsType) {
  const navigate = useNavigate();
  return (
    <>
      <HamburgerMenu pages={pages} handleMenuItemClick={handleMenuItemClick} />
      <QuickreplyIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        LINKUP
      </Typography>
    </>
  );
}
