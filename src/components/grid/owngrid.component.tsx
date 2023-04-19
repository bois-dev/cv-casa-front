import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface OwnGridProps {
    columns: GridColDef[],
    rows: any[]
    loading?: boolean
}

export default function OwnGrid(props: OwnGridProps) {
    const [columns, setColumns] = useState<GridColDef[]>(props.columns)
    useEffect(() => {
        const newColumns = props.columns.map(current => { return { ...current, headerClassName: 'super-app-theme--header' } as GridColDef })
        setColumns(newColumns)
        // eslint-disable-next-line
    }, [])

    return <Box
        sx={{
            height: 400,
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: blue[50],
            },
        }}>
        <DataGrid
            rows={props.rows}
            columns={columns}
            loading={props.loading}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
            }}
            pageSizeOptions={[10]}
            localeText={{
                footerRowSelected: (count) => `${count} línea${count > 1 ? 's' : ''} selecionada${count > 1 ? 's' : ''}`,
            }}
            autoHeight
        />
    </Box>
}