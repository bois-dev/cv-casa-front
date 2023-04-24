import { Box, TextField, SxProps, Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { Realtor } from "../../../model/realtor.model";

const defaultTextFieldSx: SxProps<Theme> = { mb: 3, backgroundColor: 'white' }

interface BasicInfoProps {
    onCurrentChange: (user: Realtor) => Promise<any>
    current: Realtor
}

export default function RealtorBasicInfo(props: BasicInfoProps) {
    const [current, setCurrent] = useState<Realtor>(props.current);

    useEffect(() => {
        props.onCurrentChange(current!)
    }, [current, props])

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
            label="Correo Eletronico"
            fullWidth
            type={'email'}
            sx={defaultTextFieldSx}
            value={current?.email ?? ''}
            error={current && !current.email}
            onChange={async (e) => await setCurrent({ ...current!, email: e.target.value })}
        />
        
        <TextField
            id="fullname"
            label="Nombre y Apellidos"
            fullWidth
            required
            sx={defaultTextFieldSx}
            value={current?.fullname ?? ''}
            error={current && !current.fullname}
            onChange={async (e) => await setCurrent({ ...current!, fullname: e.target.value })}
        />
        <TextField
            id="mobile"
            label="Mobile"
            required
            fullWidth
            sx={defaultTextFieldSx}
            value={current?.cel ?? ''}
            error={current && !current.cel}
            onChange={async (e) => await setCurrent({ ...current!, cel: e.target.value })}
        />

        <TextField
            id="telefono"
            label="Teléfono"
            fullWidth
            sx={defaultTextFieldSx}
            value={current?.tel ?? ''}
            onChange={async (e) => await setCurrent({ ...current!, tel: e.target.value })}
        />
    </Box>
}