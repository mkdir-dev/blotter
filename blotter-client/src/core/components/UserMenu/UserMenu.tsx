import { IconButton, Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';

export interface UserMenuProps {
  anchor: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const UserMenu = (props: UserMenuProps) => {
  const { anchor, handleOpenUserMenu, handleCloseUserMenu } = props;

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
        <Avatar
          alt="avatar"
          sx={{ width: 32, height: 32 }}
          // src="/static/images/avatar/2.jpg"
        />
      </IconButton>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchor)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
