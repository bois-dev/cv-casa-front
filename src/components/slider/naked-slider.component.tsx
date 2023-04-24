import { FormControl, Box, Slider, Typography, SxProps, Theme } from "@mui/material"

interface NakedSliderProps {
    id: string,
    label: string,
    value: number[],
    min?: number,
    max?: number,
    defaultValue?: number[],
    sx?: SxProps<Theme>,

    onChange: (newValues: number[]) => Promise<any>,
}

export default function NakedSlider(props: NakedSliderProps) {
    const defaultValue: number[] = props.defaultValue
                ?? [props.min ?? 0, props.max ?? 100]
    
    return <FormControl>
        <Box sx={{ width: '300px', ...props.sx! }}>
            <Typography id={`label-${props.id}`} gutterBottom sx={{ fontSize: '13px', fontWeight: '400', color: 'rgba(0, 0, 0, 0.6)' }}>
                {props.label}
            </Typography>
            <Slider            
                id={props.id}
                value={props?.value ?? defaultValue}
                min={props.min}
                max={props.max}
                onChange={async (_: Event, v: number | number[]) => await props.onChange(v as number[])}
                valueLabelDisplay="auto"
            />
        </Box>

    </FormControl>
}