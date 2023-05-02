import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AppBar, Toolbar, Button, IconButton, ButtonGroup } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { routes } from '@/core/utils/routes';
import { UserMenu } from '../UserMenu/UserMenu';
import logo from '../../../../public/images/logo.png';

export interface HeaderProps {
  openMenu: boolean;
  authPage?: boolean;
  handleOpenMenu: () => void;
}

export const Header = (props: HeaderProps) => {
  const { openMenu, authPage, handleOpenMenu } = props;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position={'sticky'} sx={{ borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {!authPage && (
          <IconButton
            edge={'start'}
            color={'inherit'}
            aria-label={'header menu'}
            onClick={handleOpenMenu}
          >
            {openMenu ? <MenuOpenIcon color={'secondary'} /> : <MenuIcon color={'secondary'} />}
          </IconButton>
        )}

        <Link href={routes.index.path}>
          <Button
            variant={'text'}
            color={'secondary'}
            startIcon={<Image src={logo} alt={'logo'} width={32} height={32} />}
          >
            Blotter
          </Button>
        </Link>

        {authPage ? (
          <ButtonGroup sx={{ gap: 2 }}>
            <Link href={routes.signin.path}>
              <Button variant={'text'} color={'secondary'}>
                Sign In
              </Button>
            </Link>

            <Link href={routes.signup.path}>
              <Button variant={'text'} color={'secondary'}>
                Sign Up
              </Button>
            </Link>
          </ButtonGroup>
        ) : (
          <UserMenu
            anchor={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
