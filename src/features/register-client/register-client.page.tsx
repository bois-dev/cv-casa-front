import { Box, Checkbox, FormControlLabel, SxProps, TextField, Theme, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Footer from "../../components/footer/footer.component";
import Container from '@mui/material/Container';
import Button from "../../components/button/button.component";
import { useState } from "react";

const theme = createTheme();

const defaultTextFieldSx: SxProps<Theme> = { mb: 3 }


interface Client {
    fullname: string,
    age: number,
    peopleQt: number,
    antecipateRents: number,
    hasKids: boolean,
    hasPets: boolean,
    hasDocs: boolean,
    alreadyInSpain: boolean,
}

interface RegisterClientProps {
    client?: Client
}

export default function RegisterClient(props: RegisterClientProps) {
    const [current, setCurrent] = useState<Client>();

    const handlePeopleQt = async (e: any) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            await setCurrent({ ...current!, peopleQt: parseInt(e.target.value) });
        }
    }

    return <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
            <PageTitle text="Nuevo cliente" />

            <Box
                sx={{
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >


                <TextField id="email" label="Correo eletronico" type="email" fullWidth sx={defaultTextFieldSx} />
                <TextField id="fullname" label="Nombre y Apellidos" fullWidth sx={defaultTextFieldSx} />
                <TextField id="age" label="Idade" type="number" fullWidth sx={defaultTextFieldSx} />
                <TextField
                    id="peopleQt"
                    label="Cuantas personas van a vivir con usted?"
                    type="number"
                    fullWidth
                    sx={defaultTextFieldSx}
                    value={current?.peopleQt ?? 0}
                    onChange={handlePeopleQt}
                />
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-around'
                }}>

                    <TextField id="wantsToPay" label="Cuanto gustaria pagar al mes (máximo)?" type="number" fullWidth sx={{ ...defaultTextFieldSx, pr: 10 }} />
                    <TextField id="antecipateRents" label="Cuantos meses en adelanto puede pagar?" type="number" fullWidth sx={defaultTextFieldSx} />
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
                        label="Tengo hijos pequeños"
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


                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Guardar
                </Button>
            </Box>
        </Container>

        <Footer />
    </ThemeProvider>

}