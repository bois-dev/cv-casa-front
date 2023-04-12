import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../../components/title/initialtitle.component';
import Toolbar from '../../components/title/toolbar.component';

const rightLink = {
    fontSize: 16,
    color: 'common.white',
    ml: 3,
};

function AppAppBar() {
    return (
        <div>
            <AppBar position="fixed" sx={{ backgroundColor: 'black', color: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ flex: 1 }} />
                    <Link
                        variant="h4"
                        underline="none"
                        color="inherit"
                        href="/"
                        sx={{ fontSize: 24 }}
                    >
                        {'ENCUENTRA PISO'}
                    </Link>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <Link
                            color="inherit"
                            variant="h6"
                            underline="none"
                            href="/login"
                            sx={rightLink}
                        >
                            {'Acceder'}
                        </Link>
                        <Link
                            variant="h6"
                            underline="none"
                            href="/register"
                            sx={{ ...rightLink }}
                        >
                            {'Dar Alta'}
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}

export default AppAppBar;