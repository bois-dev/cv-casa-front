import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import Button from '../../components/button/button.component';
import RegisterEmailService from './register-email.service';
import { useState } from 'react';
import RegisterEmailSuccess from './register-email-success.page';
import logo from '../../assets/logo.png'

const theme = createTheme();

export default function RegisterEmail() {
    let service: RegisterEmailService;
    const [registered, setRegistered] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const values = {
            email: String(formData.get('email')),
            password: String(formData.get('password')),
            confirmPassword: String(formData.get('confirmpassword')),
        };

        if (!isValid(values)) return;

        service ??= new RegisterEmailService();

        const { data } = await service.register({ email: values.email, password: values.password });
        if (data) {
            await setRegistered(true);
        }
    };

    const isValid = (info: any): boolean => {
        if (!info.email || !isEmail(info.email)) {
            toast.error('Ha informado un correo no válido.');
            return false;
        }

        if (!info.password) {
            toast.error('Es necesario informar una contraseña.')
            return false;
        }

        if (info.password !== info.confirmPassword) {
            toast.error('Contraseña y confirmación no son iguales.')
            return false;
        }

        return true;
    }

    const isEmail = (emailAdress: string) => {
        // eslint-disable-next-line
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return emailAdress.match(regex);
    }

    return <>{!registered ? <ThemeProvider theme={theme}>
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
                    <Avatar sx={{ m: 1 }} src={logo}>
                        <PersonAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Dar Alta
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            type="email"
                            fullWidth
                            id="email"
                            label="Correo Eletronico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmpassword"
                            label="Confirmar contraseña"
                            type="password"
                            id="confirmpassword"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            apuntar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        : <RegisterEmailSuccess />
        }
        </>
}