import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User, UserContact } from '../../model/user.model';
import { Box, Divider, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchUsersService from './search-users.service';

import LinkedinIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

interface SearchUsersViewContactsProps {
    current?: User,
    onClose: () => Promise<any>,
}

const fakeData: UserContact = {
    cel: '+5532',
    tel: '+335544',
    email: 'rrnazario',
    linkedin: 'https://www.linkedin.com/in/rrnazario',
    facebook: 'https://fb.com/rogimnazario',
}

export default function SearchUsersViewContactsDialog(props: SearchUsersViewContactsProps) {
    const [contacts, setContacts] = useState<UserContact>();

    // eslint-disable-next-line
    const service = new SearchUsersService();

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    const getContacts = async () => {
        if (contacts || !props.current) return;

        try {
            //const { data } = await service.contacts(props.current.id)
            const data: UserContact = { ...fakeData };
            if (data)
                await setContacts(data);

            //setContacts()
        } catch (e: any) {

        }
    }

    const handleClose = async () => await props.onClose();

    return (<>
        <Dialog open onClose={handleClose} fullWidth>
            <DialogTitle>{`Veer contactos de ${props.current?.fullname ?? 'usuario'}`}</DialogTitle>
            <DialogContent>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{
                    display: 'flex',
                    padding: 5,
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderStyle: 'solid',
                    borderRadius: '20px',
                    maxWidth: '500px'
                }}>

                    {contacts?.email && <LinkItem icon={<EmailIcon />} text='Correo' url={`mailto:${contacts.email}`} />}
                    {contacts?.tel && <LinkItem icon={<CallIcon />} text='Llamar' url={`tel:${contacts.tel}`} />}
                    {contacts?.linkedin && <LinkItem icon={<LinkedinIcon />} text='LinkedIn' url={contacts.linkedin} />}
                    {contacts?.instagram && <LinkItem icon={<InstagramIcon />} text='Instagram' url={contacts.instagram} />}
                    {contacts?.cel && <LinkItem icon={<WhatsAppIcon />} text='WhatsApp' url={`https://wa.me/${contacts.cel}`} />}
                    {contacts?.facebook && <LinkItem icon={<FacebookIcon />} text='Facebook' url={`${contacts.facebook}`} />}

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    </>);
}

function LinkItem(props: { icon: any, text: string, url: string, sx?: SxProps<Theme> }) {
    return <Box sx={{
        display: 'flex',
        width: '110px',
        ...props.sx!
    }}>
        <Box component='a' href={props.url} target='_blank'
            sx={{
                textDecoration: 'none',
                '&:hover': {
                    bgcolor: 'white',
                },
                mr: 2
            }}>{props.icon}
        </Box>
        <Box component='a' href={props.url} target='_blank'
            sx={{
                textDecoration: 'none',
                '&:hover': {
                    bgcolor: 'white',
                },
            }}>{props.text}
        </Box>
    </Box>
}