import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../../components/title/initialtitle.component';
import Toolbar from '../../components/title/toolbar.component';
import { Avatar } from '@mui/material';
import logo from '../../assets/inverted_logo.png'

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
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>

                        <Link href="/">
                            <Avatar sx={{ m: 1 }} src={logo} />
                        </Link>

                        <Link variant="h4"
                            underline="none"
                            color="inherit"
                            href="/"
                            sx={{
                                fontSize: 24,
                                mt: 2
                            }}>{'ENCUENTRA PISO'}</Link>
                    </Box>
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