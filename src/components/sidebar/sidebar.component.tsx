
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Avatar } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useNavigate } from 'react-router-dom';
import { ClosedSidebarFooter, OpenedSidebarFooter } from './sidebarfooter';

import logo from '../../assets/logo.png'

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBar(props: React.HTMLAttributes<HTMLDivElement>,) {
    const [open, setOpen] = useState(false);
    const { children } = props;

    const navigate = useNavigate();

    const handleNavigation = async (path: string) => await navigate(path);

    const handleOpen = async () => {
        await setOpen(!open);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <Avatar sx={{ m: 1, cursor: 'pointer' }} src={logo} onClick={async () => await handleNavigation('/')} />
                        <IconButton onClick={handleOpen}>
                            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                            onClick={async () => await handleNavigation('/config')}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <ConstructionIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Configuración'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>

                <List style={{ marginTop: `auto` }} >
                    <ListItem>
                        {!open ? <ClosedSidebarFooter userName='Rogerson Nazario'/> : <>
                            <OpenedSidebarFooter
                                userName='Rogerson Nazario'
                            />
                        </>}
                    </ListItem>
                </List>
            </Drawer>
            {children}
        </Box>
    );
}