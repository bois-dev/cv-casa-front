import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import PdfViewer from '../../../components/viewer/pdf-viewer.component';
import { useEffect, useState } from 'react';
import { StringHelper } from '../../../helpers/string.helper';
import ImageViewer from '../../../components/viewer/image-viewer.component';

interface ViewDocumentDialogProps {
    name?:string,
    current: File,
    onClose: () => Promise<any>
}

export default function ViewDocumentDialog(props: ViewDocumentDialogProps) {
    const [base64, setBase64] = useState<string>();
    const [isPdf,] = useState(props.current.type.endsWith('pdf'))

    useEffect(() => {
        if (props.current.type.endsWith('pdf'))
            StringHelper.fileToBase64Pdf(props.current)
                .then(b64 => setBase64(b64));
        else {
            const arr = props.current.type.split('/')

            const extension = arr[arr.length - 1];
            StringHelper.fileToBase64Image(props.current, extension)
                .then(b64 => setBase64(b64));
        }

    }, [props])

    return (
        <Dialog open onClose={props.onClose} maxWidth={'xl'} fullWidth>
            <DialogTitle>{`Veer Documento${props.name ? ` '${props.name}'` : ''}`}</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Divider />
                {base64 && (isPdf ? <PdfViewer src={base64} /> : <ImageViewer src={base64} />)}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}