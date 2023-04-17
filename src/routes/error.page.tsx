import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useRouteError } from "react-router-dom";
import { Container, Box, Avatar, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import DangerousIcon from '@mui/icons-material/Dangerous';

const theme = createTheme();

export function ErrorPage() {
  let error = useRouteError();
  console.error(error);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: red[400] }}>
            <DangerousIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ay, ¡página no encontrada!
          </Typography>
          <Link sx={{
            fontSize: 20,
            padding: 2
          }} href="/">Volver al inicio</Link>
        </Box>
      </Container>
    </ThemeProvider>
  );
}