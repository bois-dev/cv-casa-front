import { Box, Typography, Divider, Theme, SxProps } from "@mui/material";

interface SummaryInfoItemProps {
    primary: string,
    secondary: any,
    bottomDivider?: boolean,
    sx?: SxProps<Theme>
}

export default function SummaryInfoItem(props: SummaryInfoItemProps) {
    return <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 500,
            mb: 1,
            mt: 1,
            ...props.sx!
        }}>
            <Typography variant="body2" fontWeight={'bold'}>
                {props.primary}
            </Typography>
            <Typography variant="subtitle2">
                {props.secondary}
            </Typography>
        </Box>
        {(props.bottomDivider === undefined || props.bottomDivider === true) && <Divider light/>}
    </>
}