'use client'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import PlaceIcon from '@mui/icons-material/Place';import MenuIcon from '@mui/icons-material/Menu';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactElement, useState } from 'react';
import { Divider, Drawer, SvgIconTypeMap } from '@mui/material';
import { ROOTER } from '@/common/url_const';

const drawerWidth = 240;

type SidebarItem = {
  icon: ReactElement<SvgIconTypeMap>;
  name: string;
  url: string;
};

type SidebarProps = {
  items: SidebarItem[];
  open: boolean;
};

const sidebarHomeItems: SidebarItem[] = [
  {icon: <HomeIcon />, name: "Home", url: ROOTER.HOME}
]

const sidebarManagementItems: SidebarItem[] = [
  {icon: <FormatListBulletedIcon />, name: "Task", url: ROOTER.MANAGEMENT.TASK},
  {icon: <AccountTreeIcon />, name: "PLC", url: ROOTER.MANAGEMENT.PLC},
  {icon: <DirectionsCarIcon />, name: "AGV", url: ROOTER.MANAGEMENT.AGV},
  {icon: <TableRestaurantIcon />, name: "Frame", url: ROOTER.MANAGEMENT.FRAME},
  {icon: <PlaceIcon />, name: "Node", url: ROOTER.MANAGEMENT.NODE},
  {icon: <CropLandscapeIcon />, name: "Zone", url: ROOTER.MANAGEMENT.ZONE},
  {icon: <SettingsIcon />, name: "Environment", url: ROOTER.MANAGEMENT.ENVIRONMENT},
]

const sidebarMonitorItems: SidebarItem[] = [
  {icon: <FormatListBulletedIcon />, name: "Task", url: ROOTER.MONITOR.TASK},
  {icon: <AccountTreeIcon />, name: "Error", url: ROOTER.MONITOR.ERROR},
]

const SidebarItem: React.FC<SidebarProps> = ({ items, open }) => {
  return (
    <List>
      {items.map((item, ) => (
        <ListItem component="a" disablePadding href={item.url}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: '#333', // ダークグレーの背景色 TODO setting this app color to dark gray
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(open)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Simple AGV Program
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SidebarItem items={sidebarHomeItems} open={open}/>
        <Typography variant="subtitle1" sx={{ mt: 1, ml: 2 }}>Management</Typography>
        <SidebarItem items={sidebarManagementItems} open={open}/>
        <Divider />
        <Typography variant="subtitle1" sx={{ mt: 1, ml: 2 }}>Monitor</Typography>
        <SidebarItem items={sidebarMonitorItems} open={open}/>
      </Drawer>
    </Box>
  );
}