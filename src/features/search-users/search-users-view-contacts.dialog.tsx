import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { User, UserContact } from '../../model/user.model';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchUsersService from './search-users.service';
import { Link } from '@mui/icons-material';

import LinkedinIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

interface SearchUsersViewContactsProps {
    current?: User,
    onClose: () => Promise<any>,
}

const fakeData: UserContact = {
    cel: '+5532',
    email: 'rrnazario',
    linkedin: 'https://www.linkedin.com/in/rrnazario',
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
                <Box sx={{
                    display: 'flex',
                    margin: 10,
                    flexDirection: 'column',
                }}>

                    {contacts?.linkedin && <LinkItem icon={<LinkedinIcon />} text='LinkedIn' url={contacts.linkedin} />}
                    {contacts?.instagram && <LinkItem icon={<InstagramIcon />} text='Instagram' url={contacts.instagram} />}
                    {contacts?.cel && <LinkItem icon={<WhatsAppIcon />} text='WhatsApp' url={`https://wa.me/${contacts.cel}`} />}

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    </>);
}

function LinkItem(props: { icon: any, text: string, url: string }) {
    return <Box sx={{
        display: 'flex',        
        width: '110px',
        mb: 3,
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