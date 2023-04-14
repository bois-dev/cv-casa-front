import { Box, Checkbox, FormControlLabel, SxProps, TextField, Theme, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Container from '@mui/material/Container';
import Button from "../../components/button/button.component";
import { useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import RegisterService from "./register-user.service";
import { toast } from "react-toastify";
import { User } from "../../model/user.model";
import { LoadingButton } from "@mui/lab";

const theme = createTheme();

const defaultTextFieldSx: SxProps<Theme> = { mb: 3 }

interface RegisterClientProps {
    client?: User
}

export default function RegisterUser(props: RegisterClientProps) {
    const [current, setCurrent] = useState<User>();
    const [submiting, setSubmiting] = useState(false);

    let service: RegisterService;

    const handleOnlyInt = async (e: any, newValue: any) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            await setCurrent({ ...current!, ...newValue });
        }
    }

    const onSubmit = async () => {
        //validate
        console.log('sent')
        await setSubmiting(true);

        try {
            service ??= new RegisterService();

            const { data } = await service.saveUser(current!);

            if (data) {
                toast.success('Salvo com sucesso!');
            }
        } catch (e: any) {
            toast.error(e)
        }
        finally {
            await setSubmiting(false);
        }
    }

    return <SideBar>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <PageTitle text="Nuevo usuario" />

                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField id="email" label="Correo eletronico" type="email" fullWidth sx={defaultTextFieldSx} />
                    <TextField
                        id="fullname"
                        label="Nombre y Apellidos"
                        fullWidth
                        sx={defaultTextFieldSx}
                        value={current?.fullname}
                        error={current && !current.fullname}
                        onChange={async (e) => await setCurrent({ ...current!, fullname: e.target.value })}
                    />
                    <TextField id="age" label="Idade" type="number" fullWidth sx={defaultTextFieldSx} />
                    <TextField
                        id="peopleQt"
                        label="Cuantas personas van a vivir con usted?"
                        type="number"
                        fullWidth
                        sx={defaultTextFieldSx}
                        value={current?.peopleQt ?? 0}
                        error={current && current.peopleQt < 0}
                        onChange={(e) => handleOnlyInt(e, { peopleQt: parseInt(e.target.value) })}
                    />
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-around'
                    }}>
                        <TextField
                            id="wantsToPay"
                            label="Cuanto gustaria pagar al mes?"
                            type="number"
                            fullWidth
                            sx={{ ...defaultTextFieldSx, pr: 10 }}
                            value={current?.wantsToPay ?? 0}
                            onChange={async (e) => await setCurrent({ ...current!, wantsToPay: parseFloat(e.target.value) })}
                        />

                        <TextField
                            id="antecipateRents"
                            label="Cuantos meses en adelanto puede pagar?"
                            type="number"
                            fullWidth
                            sx={defaultTextFieldSx}
                            value={current?.antecipateRents ?? 0}
                            onChange={(e) => handleOnlyInt(e, { antecipateRents: parseInt(e.target.value) })} />
                    </div>

                    <div style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-around'
                    }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={current?.hasKids ?? false}
                                    name="hasKids"
                                    color="primary"
                                    onChange={async () => await setCurrent({ ...current!, hasKids: current ? !current.hasKids : false })}
                                />
                            }
                            label="Tengo hijo(s) pequeño(s)"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={current?.hasPets ?? false}
                                    name="hasPets"
                                    color="primary"
                                    onChange={async () => await setCurrent({ ...current!, hasPets: current ? !current.hasPets : false })}
                                />
                            }
                            label="Tengo mascota"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={current?.alreadyInSpain ?? false}
                                    name="alreadyInSpain"
                                    color="primary"
                                    onChange={async () => await setCurrent({ ...current!, alreadyInSpain: current ? !current.alreadyInSpain : false })}
                                />
                            }
                            label="Ya estoy en España"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={current?.hasDocs ?? false}
                                    name="hasDocs"
                                    color="primary"
                                    onChange={async () => await setCurrent({ ...current!, hasDocs: current ? !current.hasDocs : false })}
                                />
                            }
                            label="Puedo residir legalmente en España"
                        />
                    </div>

                    {!submiting ? <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={onSubmit}
                    >
                        Guardar
                    </Button>
                        : <LoadingButton
                            size="large"
                            onClick={() => { }}
                            loading
                            variant="outlined"
                            disabled
                            sx={{ mt: 3, mb: 2, fontSize: 20, borderRadius: '0' }}
                        >
                            <span>disabled</span>
                        </LoadingButton>}
                </Box>
            </Container>
        </ThemeProvider>
    </SideBar>
}