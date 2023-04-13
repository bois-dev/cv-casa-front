import { Button } from "@mui/material";
import Footer from "../../components/footer/footer.component";
import PageTitle from "../../components/title/pagetitle.component";
import { unauthenticate } from "../../redux-ts";
import { useAppDispatch } from "../../redux-ts/hooks";

export function Configurations() {
    const dispatch = useAppDispatch();

    const onLogout = async () => {
        //await setLogoutInfoVisible(false);

        // const { data } = await service.logout({
        //     login: String(localStorage.getItem('login')),
        //     token: String(localStorage.getItem('token'))
        // });

        dispatch(unauthenticate());
        
        localStorage.removeItem('token');
        localStorage.removeItem('login');

        window.location.reload();
    }

    return <>
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

        <Footer />
    </>
}