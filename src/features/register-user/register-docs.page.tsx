import { Box } from "@mui/material"
import OwnGrid from "../../components/grid/owngrid.component"
import { SliceProps } from "./register-user.interfaces"
import { GridColDef } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const gridColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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

const rows = [
    { id: 1, name: 'Comprovante do banco', date: new Date('1/11/2022'), age: 35 },
    { id: 2, name: 'Tarjeta Identificacao extranjero', date: new Date('1/11/2022'), age: 42 },
    { id: 3, name: 'Contrato de trabajo', date: new Date('1/21/2022'), age: 45 },
];

export default function RegisterDocs(props: SliceProps) {
    return <Box sx={{
        mt: 8,
    }}>
        <OwnGrid
            columns={gridColumns}
            rows={rows}
        />
    </Box>
}