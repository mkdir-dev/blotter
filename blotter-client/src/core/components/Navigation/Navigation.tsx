import { useSession } from 'next-auth/react';
import Link from 'next/link';

import {
  Collapse,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { NavPathAdmin } from '@/core/utils/navigation-paths-admin';

export interface NavigationProps {
  openMenu: boolean;
}

const drawerWidth = '240px';

export const Navigation = (props: NavigationProps) => {
  const { openMenu } = props;

  const { data: session } = useSession();

  return (
    <Collapse
      orientation="horizontal"
      in={openMenu}
      collapsedSize={60}
      sx={{
        boxSizing: 'border-box',
        borderRight: openMenu ? '' : '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          height: '100%',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            position: 'relative',
            width: drawerWidth,
            border: openMenu ? '' : 'none',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          {
            // @ts-ignore
            session?.user?.role === 'admin' && (
              <>
                <List>
                  {NavPathAdmin.map((nav) => (
                    <Link
                      key={nav.id}
                      href={nav.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          {nav.icon && <ListItemIcon>{nav.icon}</ListItemIcon>}
                          <ListItemText primary={nav.title} sx={{ flexWrap: 'nowrap' }} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
              </>
            )
          }

          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} sx={{ flexWrap: 'nowrap' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Collapse>
  );
};
