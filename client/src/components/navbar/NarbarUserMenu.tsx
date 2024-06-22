import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { LinkType } from '../../typing';
import useLogout from '../../hooks/logout';

export default function NavbarUserMenu({ links }: { links: LinkType[] }) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, isAuthenticated } = useAuth();
  const { logout } = useLogout();

  const navigate = useNavigate();
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMenuItemClick = async (link: LinkType) => {
    switch (link.name) {
      case 'Logout':
        logout();
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('no other settings for now.');
    }

    handleCloseUserMenu();
  };

  return isAuthenticated ? (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={user.email} src={user.picture} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {links.map((link) => (
          <MenuItem
            key={link.name}
            onClick={() => {
              handleMenuItemClick(link);
            }}
          >
            <Typography textAlign="center">{link.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  ) : (
    <Typography
      noWrap
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        // letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/login')}
    >
      Sign in
    </Typography>
  );
}
