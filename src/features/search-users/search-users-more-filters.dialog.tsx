import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider } from '@mui/material';
import { SearchFields } from './search-users.interfaces';
import NakedSelectRange from '../../components/select-range/select-range.component';

interface SearchUsersMoreFiltersProps {
    current?: SearchFields,
    onClose: () => Promise<any>,
    onFilter: (fields: SearchFields) => Promise<any>
}

export default function SearchUsersMoreFiltersDialog(props: SearchUsersMoreFiltersProps) {
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
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
                                { value: 20, label: '20' },
                                { value: 25, label: '25' },
                            ]}
                            itemsTo={[
                                { value: -1, label: 'Indiferente' },
                                { value: 50, label: '30' },
                                { value: 50, label: '40' },
                                { value: 50, label: '50' },
                                { value: 80, label: '80' },
                            ]}

                        />

                        <NakedSelectRange
                            sx={{ mb: 2 }}
                            id="peopleQt-slider"
                            name="peopleQt-name"
                            label="Cuantas Personas?"
                            onChange={async (e) => await setCurrent({ ...current!, peopleQt: e })}
                            value={current?.peopleQt}
                            itemsFrom={[
                                { value: -1, label: 'Indiferente' },
                                { value: 0, label: '0' },
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                                { value: 4, label: '4+' },
                            ]}
                            itemsTo={[
                                { value: -1, label: 'Indiferente' },
                                { value: 0, label: '0' },
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                                { value: 4, label: '4+' },
                            ]}
                        />

                        <NakedSelectRange
                            sx={{ mb: 2 }}
                            id="wantsToPay-slider"
                            name="wantsToPay-name"
                            label="Valor"
                            onChange={async (e) => await setCurrent({ ...current!, wantsToPay: e })}
                            value={current?.wantsToPay}
                            itemsFrom={[
                                { value: -1, label: 'Indiferente' },
                                { value: 300, label: '300' },
                                { value: 400, label: '400' },
                                { value: 500, label: '500' },
                                { value: 700, label: '700' },
                                { value: 900, label: '900' },
                                { value: 1100, label: '1100' },
                                { value: 1300, label: '1300+' },
                            ]}
                            itemsTo={[
                                { value: -1, label: 'Indiferente' },
                                { value: 300, label: '300' },
                                { value: 400, label: '400' },
                                { value: 500, label: '500' },
                                { value: 700, label: '700' },
                                { value: 900, label: '900' },
                                { value: 1100, label: '1100' },
                                { value: 1300, label: '1300+' },
                            ]}
                        />

                        <NakedSelectRange
                            sx={{ mb: 2 }}
                            id="antecipateRents-slider"
                            name="antecipateRents-name"
                            label="Alquileres antecipados"
                            onChange={async (e) => await setCurrent({ ...current!, antecipateRents: e })}
                            value={current?.antecipateRents}
                            itemsFrom={[
                                { value: -1, label: 'Indiferente' },
                                { value: 0, label: '0' },
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                                { value: 4, label: '4' },
                                { value: 5, label: '5+' },

                            ]}
                            itemsTo={[
                                { value: -1, label: 'Indiferente' },
                                { value: 0, label: '0' },
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                                { value: 4, label: '4' },
                                { value: 5, label: '5+' },
                            ]}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ApplyFilter}>Mostrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}