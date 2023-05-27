import { useState } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { AppBar, Toolbar, Button, IconButton, ButtonGroup, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import { routes } from '@/core/utils/routes';

import { UserMenu } from '../UserMenu/UserMenu';
import logo from '../../../../public/images/logo.png';

export interface HeaderProps {
  openMenu: boolean;
  handleOpenMenu: () => void;
}

export const Header = (props: HeaderProps) => {
  const { openMenu, handleOpenMenu } = props;
  const router = useRouter();
  const { status } = useSession();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
        {status === 'authenticated' && (
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
          {matches ? (
            <Button
              variant={'text'}
              color={'secondary'}
              startIcon={<Image src={logo} alt={'logo'} width={32} height={32} />}
            >
              Blotter
            </Button>
          ) : (
            <IconButton>
              <Image src={logo} alt={'logo'} width={32} height={32} />
            </IconButton>
          )}
        </Link>

        {status === 'authenticated' ? (
          <UserMenu
            anchor={anchorElUser}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
          />
        ) : (
          <ButtonGroup sx={{ gap: 2 }}>
            {router.pathname !== routes.signin.path && (
              <Link href={routes.signin.path}>
                <Button variant={'text'} color={'secondary'}>
                  Вход
                </Button>
              </Link>
            )}

            {router.pathname !== routes.signup.path && (
              <Link href={routes.signup.path}>
                <Button variant={'outlined'} color={'secondary'}>
                  Регистрация
                </Button>
              </Link>
            )}
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
};
