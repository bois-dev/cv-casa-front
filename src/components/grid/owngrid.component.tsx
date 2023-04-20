import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface OwnGridProps {
    columns: GridColDef[],
    rows: any[]
    loading?: boolean
}

interface StateProps {
    columns: GridColDef[],
    rows: any[]
}

export default function OwnGrid(props: OwnGridProps) {
    const [stateProps, setStateProps] = useState<StateProps>({ columns: props.columns, rows: props.rows })

    useEffect(() => {
        const newColumns = props.columns.map(current => { return { ...current, headerClassName: 'super-app-theme--header' } as GridColDef })

        setStateProps({ ...stateProps, columns: newColumns })

        //eslint-disable-next-line
    }, [props.columns])

    useEffect(() => {
        setStateProps({ ...stateProps, rows: props.rows })
        //eslint-disable-next-line
    }, [props.rows])

    return <Box
        sx={{
            height: 400,
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: blue[50],
            },
        }}>
        <DataGrid
            rows={stateProps.rows}
            columns={stateProps.columns}
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
            components={{
                NoRowsOverlay: () => <>
                    <GridOverlay>
                        <div>Sin dados</div>
                    </GridOverlay>
                </>
            }}
        />
    </Box>
}