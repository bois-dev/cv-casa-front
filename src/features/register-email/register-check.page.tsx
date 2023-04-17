import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Box, Avatar, Typography, createTheme, Link } from "@mui/material";
import { green } from "@mui/material/colors";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegisterEmailService from "./register-email.service";

export default function RegisterCheck() {
    const theme = createTheme();
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('Su correo electrónico ha sido validado con éxito.')
    const [success, setSuccess] = useState(true)

    const navigate = useNavigate();
    const service = new RegisterEmailService();

    useEffect(() => {
        checkId();
        // eslint-disable-next-line
    }, [searchParams])

    const checkId = async () => {
        if (searchParams.has('id')) {
            const id = searchParams.get('id')

            const { data } = await service.check(id!)
            if (!data)
                navigate('/')
            else {
                if (data.message)
                    await setMessage(data.message)

                if (data.success !== undefined)
                    await setSuccess(data.success)
            }
        }
        else {
            navigate('/')
        }
    }

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
                    {success ? <CheckCircleOutlineIcon /> : <WarningAmberIcon />}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {success ? '¡Listo!' : 'Algo salió mal'}
                </Typography>
                <Typography >
                    {message}
                </Typography>
                {success && <Link
                    underline="none"
                    href="/login"
                    sx={{ mt: 5 }}
                >
                    {'Ir para acceder'}
                </Link>}
            </Box>
        </Container>
    </ThemeProvider>
}