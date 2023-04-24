import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import { SearchFields } from './search-users.interfaces';
import NakedSelectRange from '../../components/select-range/select-range.component';

interface SearchUsersMoreFiltersProps {
    current?: SearchFields,
    onClose: () => Promise<any>,
    onFilter: (fields: SearchFields) => Promise<any>
}

export default function SearchUsersMoreFilters(props: SearchUsersMoreFiltersProps) {
    const [current, setCurrent] = React.useState<SearchFields>(props.current!);

    const handleClose = async () => {
        await props.onClose();
    }

    const ApplyFilter = async () => {
        await props.onFilter(current!);

        await props.onClose();
    }

    return (
        <div>
            <Dialog open onClose={handleClose} fullWidth>
                <DialogTitle>Filtros</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Divider />
                    <NakedSelectRange
                        sx={{ mb: 2 }}
                        id="age-slider"
                        name="age-name"
                        label="Idade"
                        onChange={async (e) => await setCurrent({ ...current!, age: e })}
                        value={current?.age}
                        itemsFrom={[
                            { value: -1, label: 'Indiferente' },
                            { value: 16, label: '16' },
                            { value: 16, label: '20' },
                            { value: 16, label: '25' },
                        ]}
                        itemsTo={[
                            { value: -1, label: 'Indiferente' },
                            { value: 50, label: '30' },
                            { value: 50, label: '40' },
                            { value: 50, label: '50' },
                            { value: 80, label: '80' },
                        ]}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ApplyFilter}>Mostrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}