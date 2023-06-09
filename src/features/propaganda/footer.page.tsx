import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../../components/Typography/typography.component';
import TextField from '../../components/TextField/textfield.component';

import Facebook from '../../assets/propaganda/appFooterFacebook.png'
import Twitter from '../../assets/propaganda/appFooterTwitter.png'

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://rrnazario.github.io/">
        BoisDev
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#7fc7d9',
  mr: 1,
  '&:hover': {
    bgcolor: 'white',
  },
};

const LANGUAGES = [
  {
    code: 'es-ES',
    name: 'Castellano',
  },
  {
    code: 'pt-BR',
    name: 'Português (BR)',
  },
];

export default function PropagandaFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'black', color: 'white' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="/" sx={iconStyle}>
                  <img
                    src={Facebook}
                    alt="Facebook"
                  />
                </Box>
                <Box component="a" href="/" sx={iconStyle}>
                  <img
                    src={Twitter}
                    alt="Twitter"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/terms/">Termos</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/privacy">Privacidade</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Idioma
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}