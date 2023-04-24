import { Box, TextField, SxProps, Theme } from "@mui/material";
import { User, UserContact } from "../../../model/user.model";
import { useEffect, useState } from "react";

const defaultTextFieldSx: SxProps<Theme> = { mb: 3, backgroundColor: 'white' }

interface UserContactsProps {
    onCurrentChange: (user: User) => Promise<any>
    current: User
}

export default function UserContacts(props: UserContactsProps) {
    const [current, setCurrent] = useState<UserContact>(props.current?.contacts!);

    useEffect(() => {
        const newCurrent = {...props.current!, contacts: current!}

        props.onCurrentChange(newCurrent)
    }, [props, current])

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
            value={current?.email ?? 'Ya informado'}
        />
        <TextField
            id="telefono"
            label="Teléfono"
            type="tel"
            fullWidth
            helperText={'Añadir el codigo del país al inicio. Ejemplo: +553298888-7777'}
            sx={defaultTextFieldSx}
            value={current?.tel ?? ''}
            onChange={async (e) => await setCurrent({ ...current!, tel: e.target.value })}
        />
        <TextField
            id="Instagram"
            label="Instagram"
            fullWidth
            helperText={'Añadir solo tu usuário: Ejemplo: @my.user'}
            sx={defaultTextFieldSx}
            value={current?.instagram ?? ''}
            onChange={async (e) => await setCurrent({ ...current!, instagram: e.target.value })}
        />
        <TextField
            id="facebook"
            label="Facebook"
            fullWidth
            helperText={'Ejemplo: facebook.com/my.user'}
            sx={defaultTextFieldSx}            
            value={current?.facebook ?? ''}
            onChange={async (e) => await setCurrent({ ...current!, facebook: e.target.value })}
        />
        <TextField
            id="linkedin"
            label="Linkedin"
            fullWidth
            helperText={'Ejemplo: linkedin.com/in/my.user'}
            sx={defaultTextFieldSx}            
            value={current?.linkedin ?? ''}
            onChange={async (e) => await setCurrent({ ...current!, linkedin: e.target.value })}
        />
    </Box>
}