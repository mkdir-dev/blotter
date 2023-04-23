import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AppBar, Toolbar, Button, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { UserMenu } from '../UserMenu/UserMenu';
import logo from '../../../assets/images/logo.png';

export interface HeaderProps {
  openMenu: boolean;
  handleOpenMenu: () => void;
}

export const Header = (props: HeaderProps) => {
  const { openMenu, handleOpenMenu } = props;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position={'sticky'}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          edge={'start'}
          color={'inherit'}
          aria-label={'header menu'}
          onClick={handleOpenMenu}
        >
          {openMenu ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        <Link
          href={'/'}
          // href={Routes.ForgotPasswordPage()}
        >
          <Button
            variant={'text'}
            color={'secondary'}
            startIcon={<Image src={logo} alt={'logo'} width={32} height={32} />}
          >
            Blotter
          </Button>
        </Link>

        <UserMenu
          anchor={anchorElUser}
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
        />
      </Toolbar>
    </AppBar>
  );
};
