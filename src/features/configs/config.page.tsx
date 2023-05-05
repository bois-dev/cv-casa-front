import { Button, Container, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import { unauthenticate } from "../../redux-ts";
import { useAppDispatch } from "../../redux-ts/hooks";
import { SideBar } from "../../components/sidebar";

const theme = createTheme();

export function Configurations() {
    const dispatch = useAppDispatch();

    const onLogout = async () => {
        dispatch(unauthenticate());

        localStorage.removeItem('token');
        localStorage.removeItem('login');

        window.location.reload();
    }

    return <SideBar>
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <PageTitle text="Configurações" />

                <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Button onClick={onLogout} color={'primary'}>
                        Salir
                    </Button>
                </div>
            </Container>
        </ThemeProvider>
    </SideBar>
}