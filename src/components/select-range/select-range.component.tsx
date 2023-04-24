import Box from '@mui/material/Box';
import NativeSelect from '@mui/material/NativeSelect';
import { SxProps, Theme, Typography } from '@mui/material';

interface NakedSelectRangeProps {
    value: { from: number, to: number },
    id: string,
    name: string,
    label: string,

    labelFrom?: string,
    labelTo?: string,

    itemsFrom: { value: number, label: string }[],
    itemsTo: { value: number, label: string }[],

    sx?: SxProps<Theme>,
    onChange: (item: { from: number, to: number }) => Promise<any>
}

export default function NakedSelectRange(props: NakedSelectRangeProps) {
    const defaultValue = { value: -1, label: 'Indiferente' };

    return (
        <Box>
            <Typography id={`label-${props.id}`}
                gutterBottom
                sx={{
                    fontSize: '13px',
                    fontWeight: '400',
                    color: 'rgba(0, 0, 0, 0.6)',
                    mb: 2
                }}>
                {props.label}
            </Typography>

            <Box sx={{
                display: 'flex'
            }}>
                <Box sx={{
                    mr: 3
                }}>
                    <Typography id={`label-${props.id}`} gutterBottom sx={{ fontSize: '13px', fontWeight: '400', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {props.labelFrom ?? 'Minimo'}
                    </Typography>

                    <NativeSelect
                        inputProps={{
                            name: props.name,
                            id: props.id,
                        }}
                        sx={{ ...props.sx! }}
                        value={props.value ? props.value.from : defaultValue.value}
                        onChange={async (e) => await props.onChange({ ...props.value, from: Number(e.target.value) })}
                    >
                        {props.itemsFrom.map((item, k) => <option value={item.value} key={k}>{item.label}</option>)}
                    </NativeSelect>
                </Box>

                <Box>
                    <Typography id={`label-${props.id}`} gutterBottom sx={{ fontSize: '13px', fontWeight: '400', color: 'rgba(0, 0, 0, 0.6)' }}>
                        {props.labelTo ?? 'Máximo'}
                    </Typography>
                    <NativeSelect
                        inputProps={{
                            name: props.name,
                            id: props.id,
                        }}
                        sx={{ ...props.sx! }}
                        value={props.value ? props.value.to : defaultValue.value}
                        onChange={async (e) => await props.onChange({ ...props.value!, to: Number(e.target.value) })}
                    >
                        {props.itemsTo.map((item, k) => <option value={item.value} key={k}>{item.label}</option>)}
                    </NativeSelect>
                </Box>
            </Box>
        </Box>
    );
}