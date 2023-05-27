import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import {
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { useLogout } from '@/modules/auth/hooks/use-logout';
import { routes } from '@/core/utils/routes';

export interface UserMenuProps {
  anchor: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
}

// const userMenuSettings = [{ title: 'Logout', onClick: }];

export const UserMenu = (props: UserMenuProps) => {
  const { anchor, handleOpenUserMenu, handleCloseUserMenu } = props;

  const { data: session } = useSession();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoadingLogout, handleUseLogout } = useLogout({
    onSuccess: () => {
      router.push(routes.index.path);
    },
    onError: async (err) => {
      console.error(err);

      enqueueSnackbar('Ошибка выхода', { variant: 'error' });
    },
  });

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
          horizontal: 'left',
        }}
        open={Boolean(anchor)}
        onClose={handleCloseUserMenu}
      >
        {/*
        settings.map((setting) => (
          <MenuItem
            key={setting}
            // onClick={handleCloseUserMenu}
            onClick={async () => {
              // await signOut();
            }}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))
          */}
        <Divider sx={{ my: 1 }} />
        <MenuItem
          key={'logout'}
          onClick={async () => {
            // @ts-ignore
            handleUseLogout(session?.user.access_token);
          }}
          disabled={isLoadingLogout}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Выйти</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
