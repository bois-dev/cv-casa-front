import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Box, Avatar, Typography, createTheme, Link } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function RegisterEmailSuccess() {
    const theme = createTheme();

    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: green[500] }}>
                    <CheckCircleOutlineIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    ¡Listo!
                </Typography>
                <Typography >
                    Te enviamos un correo para proseguir.
                </Typography>
                <Link
                    underline="none"
                    href="/login"
                    sx={{ mt: 5 }}
                >
                    {'Ir para acceder'}
                </Link>
            </Box>
        </Container>
    </ThemeProvider>
}