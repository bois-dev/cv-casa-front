import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Box, Avatar, Typography, createTheme, Link } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegisterEmailService from "./register-email.service";

import logo from '../../assets/logo.png'

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
                <Avatar sx={{ m: 1, bgcolor: success ? green[500] : red[400] }} src={logo} />
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