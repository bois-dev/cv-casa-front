import { Box, Avatar, Typography, SxProps, Theme } from "@mui/material";
import { blue } from "@mui/material/colors";

interface SummarySubtitleProps {
    title: string,
    sx?: SxProps<Theme>
    icon: any
}

export default function SummarySubtitle(props: SummarySubtitleProps) {
    const { title } = props;

    return <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        mb: 3,
        gap: '10px',
        ...props.sx!
    }}>
        <Avatar sx={{ bgcolor: blue[500] }}>
            {props.icon}
        </Avatar>
        <Typography variant="h6" gutterBottom sx={{ mt: '5px' }}>
            {title}
        </Typography>
    </Box>
}