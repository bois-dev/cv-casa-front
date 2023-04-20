import { Box, Button, IconButton } from "@mui/material"
import OwnGrid from "../../../components/grid/owngrid.component"
import { AddDocument, SliceProps } from "../register-user.interfaces"
import { GridColDef } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { HelpOutline } from "@mui/icons-material";
import NewDocumentDialog from "./newdoc.dialog";
import { useState } from "react";
import { User } from "../../../model/user.model";
import AlertDialog from "../../../components/alert/alert.component";
import ViewDocumentDialog from "./viewdoc.dialog";

interface documentColumn {
    id: number,
    name: string,
    date: Date,
    content: File
}

interface stateProps {
    addDocumentVisible: boolean,
    removeDocumentVisible: boolean,
    removeDocumentName?: string
    viewDocumentVisible: boolean,
    viewDocumentContent?: File
}

export default function RegisterDocs(props: SliceProps) {
    const [stateProp, setStateProp] = useState<stateProps>({
        addDocumentVisible: false,
        removeDocumentVisible: false,
        viewDocumentVisible: false
    });

    const [rows, setRows] = useState<documentColumn[]>(props.current?.documents?.map(ud => {
        return {
            id: ud.id,
            content: ud.file,
            name: ud.name,
            date: ud.date
        }
    }) ?? [])

    const [current, setCurrent] = useState<User>(props.current)

    const gridColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Documento',
            flex: 1,
            minWidth: 350,
        },
        {
            field: 'date',
            headerName: 'Fecha',
            type: 'date',
            width: 110,
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
        {
            field: 'delete',
            headerName: 'Borrar',
            description: 'Haz clic para borrar el documento',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <>
                        <DeleteIcon sx={{
                            cursor: 'pointer'
                        }} onClick={async () => await onDeleteClick(params.row)} />
                    </>
                );
            }
        },
    ]

    const onDeleteClick = async (row: documentColumn) => {
        await setStateProp({ ...stateProp, removeDocumentVisible: true, removeDocumentName: row.name })
    }

    const onViewClick = async (row: documentColumn) => {
        await setStateProp({ ...stateProp, viewDocumentVisible: true, viewDocumentContent: row.content })
    }

    const onSaveNewDoc = async (d: AddDocument) => {

        const newDoc: documentColumn = {
            name: d.content.name,
            id: new Date().getMilliseconds(),
            date: new Date(),
            content: d.content
        };

        const newRows = [...rows, newDoc]

        await updateRows(newRows)
    }

    const onConfirmRemoveDocument = async () => {
        await setStateProp({ ...stateProp, removeDocumentVisible: false })

        let newRows = [...rows]
        const index = newRows.findIndex(d => d.name === stateProp.removeDocumentName!)

        newRows.splice(index, 1)

        await updateRows(newRows)
    }

    async function onCancelRemoveDocument(): Promise<any> {
        await setStateProp({ ...stateProp, removeDocumentVisible: false })
    }

    const updateRows = async (newRows: documentColumn[]) => {
        await setRows(newRows)

        const newCurrent: User = {
            ...current,
            documents: newRows.map(docCol => {
                return {
                    file: docCol.content,
                    name: docCol.name,
                    date: docCol.date,
                    id: docCol.id
                }
            })
        }

        await setCurrent(newCurrent)

        await props.onCurrentChange(newCurrent)
    }

    return <Box sx={{
        mt: 8,
    }}>
        <Box
            sx={{
                flex: '1 1 auto',
                display: 'flex',
                justifyContent: 'flex-end',
                mb: 3
            }}
        >
            <Button
                variant="contained"
                onClick={async () => await setStateProp({ ...stateProp, addDocumentVisible: true })} sx={{ mr: 1, fontSize: 12 }}>
                Añadir documento
            </Button>

            <IconButton color="primary" aria-label="upload picture" component="label">
                <HelpOutline />
            </IconButton>
        </Box>

        {stateProp.addDocumentVisible &&
            <NewDocumentDialog
                onClose={async () => await setStateProp({ ...stateProp, addDocumentVisible: false })}
                onSave={onSaveNewDoc}
            />}

        {stateProp.removeDocumentVisible &&
            <AlertDialog
                onConfirm={onConfirmRemoveDocument}
                onCancel={onCancelRemoveDocument}
                text={`Desea borrar el documento '${stateProp.removeDocumentName}'?`}
            />}

        {stateProp.viewDocumentVisible &&
            <ViewDocumentDialog
                current={stateProp.viewDocumentContent!}
                onClose={async () => await setStateProp({ ...stateProp, viewDocumentVisible: false })}
            />}

        <OwnGrid
            columns={gridColumns}
            rows={rows}
        />

    </Box>
}