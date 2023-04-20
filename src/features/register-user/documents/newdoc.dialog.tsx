import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { AddDocument } from '../register-user.interfaces';
import UploadArea from '../../../components/upload/upload.component';

interface NewDocumentDialogProps {
    current?: AddDocument,
    onClose: () => Promise<any>,
    onSave: (doc: AddDocument) => Promise<any>
}

export default function NewDocumentDialog(props: NewDocumentDialogProps) {
    const [open, setOpen] = React.useState(true);
    const [current, setCurrent] = React.useState<AddDocument>(props.current!);

    const handleClose = async () => {
        setOpen(false);

        await props.onClose();
    };

    const handleSave = async () => {
        setOpen(false);

        await props.onSave(current!);

        await props.onClose();
    };

    const onFileSelected = async (e: File) => {
        await setCurrent({ ...current, content: e })
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Añadir Documento</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Divider />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={current?.name ?? ''}
                        onChange={(e) => setCurrent({ ...current, name: e.target.value })}
                        helperText={'El nombre del nuevo documento. Ejemplo: Tarjeta de idenficación de extranjero'}
                        sx={{
                            mb: 3
                        }}
                    />

                    <UploadArea onFileSelected={onFileSelected} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}