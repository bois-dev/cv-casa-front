import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import OwnGrid from '../../components/grid/owngrid.component';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { User } from '../../model/user.model';
import ViewDocumentDialog from '../register-user/documents/viewdoc.dialog';

interface SearchUsersViewDocsDialogProps {
    current?: User,
    onClose: () => Promise<any>,
}

interface documentColumn {
    id: number,
    name: string,
    content: File
}

interface state {
    viewDocumentVisible: boolean,
    viewDocumentContent?: File,
    docTitle?:string
}

export default function SearchUsersViewDocsDialog(props: SearchUsersViewDocsDialogProps) {
    const [dialogState, setDialogPageState] = useState<state>({
        viewDocumentVisible: false,
    })

    const [rows, ] = useState<documentColumn[]>(props.current?.documents?.map(ud => {
        return {
            id: ud.id,
            content: ud.file,
            name: ud.name,
        }
    }) ?? [])

    const onViewClick = async (row: documentColumn) => {
        await setDialogPageState({ 
            ...dialogState,
            viewDocumentVisible: true, 
            viewDocumentContent: row.content,
            docTitle: row.name
        })
    }

    const gridColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Documento',
            flex: 1,
            minWidth: 350,
        },
        {
            field: 'link',
            headerName: 'Veer',
            description: 'Haz clic para veer el documento',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <>
                        <ManageSearchIcon sx={{
                            cursor: 'pointer'
                        }} onClick={() => onViewClick(params.row)} />

                    </>
                );
            },
        },
    ]

    const handleClose = async () => {
        await props.onClose();
    }

    return (<>
        <Dialog open onClose={handleClose} fullWidth>
            <DialogTitle>{`Ver Documentos de ${props.current?.fullname ?? 'usuario'}`}</DialogTitle>
            <DialogContent>
                <OwnGrid
                    columns={gridColumns}
                    rows={rows}
                    sx={{ height: '100%', maxHeight: 400 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>

        {dialogState.viewDocumentVisible &&
            <ViewDocumentDialog
                name={dialogState.docTitle!}
                current={dialogState.viewDocumentContent!}
                onClose={async () => await setDialogPageState({ ...dialogState, viewDocumentVisible: false })}
            />}
    </>);
}