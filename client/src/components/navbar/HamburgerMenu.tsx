import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, IconButton, MenuItem, Typography, Menu } from '@mui/material';
import { NavbarPropsType } from '../../typing';

export default function HamburgerMenu({
  links,
  handleMenuItemClick,
}: NavbarPropsType) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
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
  );
}
