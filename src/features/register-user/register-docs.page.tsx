import { Box, Button, IconButton } from "@mui/material"
import OwnGrid from "../../components/grid/owngrid.component"
import { AddDocument, SliceProps } from "./register-user.interfaces"
import { GridColDef } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { HelpOutline } from "@mui/icons-material";
import NewDocumentDialog from "./newdoc.dialog";
import { useState } from "react";

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

interface docCols {
    id: number,
    name: string,
    date: Date
}

export default function RegisterDocs(props: SliceProps) {
    const [addDocumentVisible, setAddDocumentVisible] = useState(false);
    const [rows, setRows] = useState<docCols[]>([])


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
                onClick={() => setAddDocumentVisible(true)} sx={{ mr: 1, fontSize: 12 }}>
                Añadir documento
            </Button>

            <IconButton color="primary" aria-label="upload picture" component="label">
                <HelpOutline />
            </IconButton>
        </Box>

        {addDocumentVisible &&
            <NewDocumentDialog
                onClose={async () => await setAddDocumentVisible(false)}
                onSave={async (d: AddDocument) => {
                    await setRows([...rows!, { name: d.content.name, id: new Date().getMilliseconds(), date: new Date() }])
                }}
            />}

        <OwnGrid
            columns={gridColumns}
            rows={rows!}
        />

    </Box>
}