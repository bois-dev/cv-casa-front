import * as React from 'react';
import Button from '../../components/button/button.component';
import MyTypography from '../../components/Typography/typography.component';
import { Theme, styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const backgroundImage =
    'https://images.unsplash.com/photo-1649302926386-93127a3e00c0?auto=format&fit=crop&w=1400';


const ProductHeroLayoutRoot = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
    },
}));

const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
});

interface ProductHeroLayoutProps {
    sxBackground: SxProps<Theme>;
}

function ProductHeroLayout(
    props: React.HTMLAttributes<HTMLDivElement> & ProductHeroLayoutProps,
) {
    const { sxBackground, children } = props;

    return (
        <ProductHeroLayoutRoot>
            <Container
                sx={{
                    mt: 3,
                    mb: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {children}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'common.black',
                        opacity: 0.5,
                        zIndex: -1,
                    }}
                />
                <Background sx={sxBackground} />
                <Box
                    component="img"
                    src="productHeroArrowDown.png"
                    height="16"
                    width="12"
                    alt="arrow down"
                    sx={{ position: 'absolute', bottom: 32 }}
                />
            </Container>
        </ProductHeroLayoutRoot>
    );
}

export default function FirstLevel() {
    return (
        <ProductHeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: '#7fc7d9', // Average color of the background image.
                backgroundPosition: 'center',
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <img
                style={{ display: 'none' }}
                src={backgroundImage}
                alt="increase priority"
            />
            <MyTypography color="inherit" align="center" variant="h2" marked="center">
                MEJORA TUS CHANCES
            </MyTypography>

            <MyTypography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
                En el nuestro catalogo puedes mejorar unos 30% tus chances de alquilar un piso en España.
            </MyTypography>
            <Button
                color="secondary"
                variant="contained"
                size="large"
                component="a"
                href="/register"
                sx={{ minWidth: 200 }}
            >
                Apúntate
            </Button>
            <MyTypography variant="body2" color="inherit" sx={{ mt: 2 }}>
                ¡No percad la oportunidad!
            </MyTypography>
        </ProductHeroLayout>
    );
}
