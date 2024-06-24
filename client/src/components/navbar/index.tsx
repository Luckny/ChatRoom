import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import MiniNavbar from './MiniNavbar';
import Navbar from './Navbar';
import NavbarUserMenu from './NarbarUserMenu';
import { LinkType, Links } from '../../typing';

const links: Links = {
  navLinks: [
    {
      name: 'Features',
      href: '/',
    },
    {
      name: 'How It Works',
      href: '/',
    },
    {
      name: 'Testimonials',
      href: '/',
    },
    // {
    //   name: 'Chat',
    //   href: '/chat',
    // },
  ],

  userLinks: [
    // {
    //   name: 'Logout',
    //   // TODO: dynamic providers
    //   href: 'http://localhost:8080/logout/google',
    // },
  ],
};

export default function ApplicationBar() {
  const navigate = useNavigate();

  const handleMenuItemClick = (link: LinkType) => {
    navigate(link.href);
  };

  return (
    <AppBar color="inherit" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MiniNavbar
            links={links.navLinks}
            handleMenuItemClick={handleMenuItemClick}
          />
          <Navbar
            links={links.navLinks}
            handleMenuItemClick={handleMenuItemClick}
          />
          <NavbarUserMenu links={links.userLinks} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
