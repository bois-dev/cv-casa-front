import { Box, TextField, FormControlLabel, Checkbox, SxProps, Theme } from "@mui/material";
import { User } from "../../../model/user.model";
import { useEffect, useState } from "react";

const defaultTextFieldSx: SxProps<Theme> = { mb: 3 }

interface BasicInfoProps {
    onCurrentChange: (user: User) => Promise<any>
    current: User
}

export default function BasicInfo(props: BasicInfoProps) {
    const [current, setCurrent] = useState<User>(props.current);

    useEffect(() => {
        props.onCurrentChange(current!)
    }, [current, props])

    const handleOnlyInt = async (e: any, newValue: any) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            await setCurrent({ ...current!, ...newValue });
        }
    }

    return <Box
        sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            backgroundColor: 'whitesmoke',
            borderRadius: '20px'
        }}
    >
        <TextField
            id="email"
            disabled
            label="Correo eletronico"
            type="email"
            fullWidth
            sx={defaultTextFieldSx}
            value={current?.email ?? 'read.only.email@email.com'}
        />

        <TextField
            id="fullname"
            label="Nombre y Apellidos"
            fullWidth
            sx={defaultTextFieldSx}
            value={current?.fullname ?? ''}
            error={current && !current.fullname}
            onChange={async (e) => await setCurrent({ ...current!, fullname: e.target.value })}
        />
        <TextField
            id="age"
            label="Idade"
            type="number"
            fullWidth
            sx={defaultTextFieldSx}
            value={current?.age ?? 0}
            error={current && current.age <= 14}
            onChange={(e) => handleOnlyInt(e, { age: parseInt(e.target.value) })}
        />
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
            justifyContent: 'space-between'
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
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
            }}>
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

        {/* {!props.submiting ? <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={async () => await props.onSubmit(props.current)}
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
            </LoadingButton>} */}
    </Box>
}