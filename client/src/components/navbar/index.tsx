import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import MiniNavbar from './MiniNavbar';
import Navbar from './Navbar';
import NavbarUserMenu from './NarbarUserMenu';
import { PageType } from '../../typing';

const pages: PageType[] = [
  {
    name: 'Chat',
    ref: '/chat',
  },
];

export default function ApplicationBar() {
  const navigate = useNavigate();

  const handleMenuItemClick = (page: PageType) => {
    navigate(page.ref);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MiniNavbar pages={pages} handleMenuItemClick={handleMenuItemClick} />
          <Navbar pages={pages} handleMenuItemClick={handleMenuItemClick} />
          <NavbarUserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
