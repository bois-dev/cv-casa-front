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
        headerName: 'Ver',
        description: 'Haz clic para ver el documento subido',
        sortable: false,
        width: 90,
        renderCell: (params) => {
            return (
                <>
                    <ManageSearchIcon sx={{
                        cursor: 'pointer'
                    }} onClick={() => console.log(params.row)} />

                </>
            );
        }
    },
    {
        field: 'delete',
        headerName: 'Apagar',
        description: 'Haz clic para apagar el documento subido',
        sortable: false,
        width: 90,
        renderCell: (params) => {
            return (
                <>
                    <DeleteIcon sx={{
                        cursor: 'pointer'
                    }} onClick={() => console.log(params.row)} />
                </>
            );
        }
    },
]

interface documentColumn {
    id: number,
    name: string,
    date: Date,
    content: File
}

interface stateProps {
    addDocumentVisible: boolean,
}

export default function RegisterDocs(props: SliceProps) {
    const [stateProp, setStateProp] = useState<stateProps>({ addDocumentVisible: false });

    const [rows, setRows] = useState<documentColumn[]>(props.current?.documents?.map(ud => {
        return {
            id: ud.id,
            content: ud.file,
            name: ud.name,
            date: ud.date
        }
    }) ?? [])

    const [current, setCurrent] = useState<User>(props.current)

    const onSaveNewDoc = async (d: AddDocument) => {

        const newDoc: documentColumn = {
            name: d.content.name,
            id: new Date().getMilliseconds(),
            date: new Date(),
            content: d.content
        };

        const newRows = [...rows, newDoc]

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

        {stateProp?.addDocumentVisible &&
            <NewDocumentDialog
                onClose={async () => await setStateProp({ ...stateProp, addDocumentVisible: false })}
                onSave={onSaveNewDoc}
            />}

        <OwnGrid
            columns={gridColumns}
            rows={rows!}
        />

    </Box>
}