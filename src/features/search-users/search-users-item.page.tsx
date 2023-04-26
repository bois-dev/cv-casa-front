import { Avatar, Box, Button, Card, CardContent, CardMedia, SxProps, Theme, Tooltip, Typography } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import { User } from "../../model/user.model"
import avatar from '../../assets/avatar.png'

import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import PetsIcon from '@mui/icons-material/Pets';
import TaskIcon from '@mui/icons-material/Task';
import FlightLandIcon from '@mui/icons-material/FlightLand';

import { green } from "@mui/material/colors";
import SearchUsersViewDocsDialog from "./search-users-view-docs.dialog";
import { useState } from "react";

interface SearchResultItemProps {
    user: User,
}

const formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
})

export default function SearchResultItem(props: SearchResultItemProps) {
    const [viewDocs, setViewDocs] = useState(false)

    return <>
        <Card sx={{ display: 'flex', ml: 2, mb: 2, width: 500, backgroundColor: '#F5FBFF' }}>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={avatar}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {props.user.fullname}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {`${props.user.age} años`}
                    </Typography>

                    <AvatarWithText
                        value={`${formatter.format(props.user.wantsToPay)} (${props.user.antecipateRents} meses en adelanto)`}
                        icon={<Tooltip title="Cuanto gustaria pagar el usuario" placement="top">
                            <PaidIcon />
                        </Tooltip>}
                    />
                    <AvatarWithText
                        value={props.user.peopleQt}
                        icon={<Tooltip title="Cuántas personas van a vivir con el usuario" placement="top">
                            <PeopleIcon />
                        </Tooltip>}
                        avatarSx={{ bgcolor: '#303f9f' }}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>

                        {props.user.alreadyInSpain && <Avatar
                            alt="has Pets"
                            sx={{ width: 24, height: 24, bgcolor: '#f50057', mr: 1, cursor: 'pointer' }}
                        >

                            <Tooltip title="Ya está en España" placement="top">
                                <FlightLandIcon />
                            </Tooltip>
                        </Avatar>}

                        {props.user.hasDocs && <Avatar
                            alt="has Pets"
                            sx={{ width: 24, height: 24, bgcolor: green[900], mr: 1, cursor: 'pointer' }}
                        >

                            <Tooltip title="Puedes vivir legalmente en España" placement="top">
                                <TaskIcon />
                            </Tooltip>
                        </Avatar>}

                        {props.user.hasKids && <Avatar
                            alt="has Kids"
                            about="Tiene niños pequeños"
                            sx={{ width: 24, height: 24, bgcolor: '#fbc02d', mr: 1, cursor: 'pointer' }}
                        >
                            <Tooltip title="Tiene niños pequeños" placement="top">
                                <ChildFriendlyIcon />
                            </Tooltip>
                        </Avatar>}

                        {props.user.hasPets && <Avatar
                            alt="has Pets"
                            sx={{ width: 24, height: 24, bgcolor: '#c2185b', mr: 1, cursor: 'pointer' }}
                        >

                            <Tooltip title="Tiene mascota" placement="top">
                                <PetsIcon />
                            </Tooltip>
                        </Avatar>}
                    </Box>

                </CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Button
                        variant="contained"
                        size={'small'}
                        startIcon={<MailIcon />}
                        sx={{
                            fontSize: 12,
                            mr: 3,
                            height: '40px'

                        }}
                        onClick={async () => { }}>
                        {`Contactar`}
                    </Button>

                    {props.user.documents && props.user.documents.length > 0 && <Button
                        variant="outlined"
                        size={'small'}
                        startIcon={<PlagiarismIcon />}
                        sx={{
                            fontSize: 12,
                            mr: 3,
                            height: '40px'

                        }}
                        onClick={async () => await setViewDocs(true)}>
                        {`Ver documentos`}
                    </Button>}

                    {viewDocs && <SearchUsersViewDocsDialog
                        onClose={async () => await setViewDocs(false)}
                        current={props.user}
                    />}
                </Box>
            </Box>

        </Card>
    </>
}

interface AvatarWithTextProps {
    value: any,
    icon: any,
    sx?: SxProps<Theme>,
    avatarSx?: SxProps<Theme>,
}

function AvatarWithText(props: AvatarWithTextProps) {
    return <>
        <Box sx={{
            display: 'flex',
            mb: 1,
            ...props.sx!
        }}>
            <Avatar
                alt="Cuanto A pagar"
                sx={{ width: 24, height: 24, bgcolor: green[500], mr: 1, ...props.avatarSx! }}
            >
                {props.icon}
            </Avatar>
            <Typography variant="body1" color="text.secondary" sx={{
                fontWeight: 'bold'
            }}>
                {props.value}
            </Typography>
        </Box>
    </>
}