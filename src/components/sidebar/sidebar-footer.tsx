import { Stack, Avatar } from '@mui/material';
import ContextMenu from '../context-menu/ctxmenu.component';
import { useState } from 'react';

const avatarSx = { cursor: 'pointer' }

export interface SidebarFooterProps {
    userName: string,
    open: boolean
}

export function SidebarFooter(props: SidebarFooterProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const [showContextMenu, setShowContextMenu] = useState(false);

    return <Stack direction="row" spacing={1}>
        <ContextMenu anchorEl={anchorEl!} open={showContextMenu} onClose={() => setShowContextMenu(false)} />
        <Avatar
            sx={avatarSx}
            onClick={(e) => {
                setAnchorEl(e.currentTarget)
                setShowContextMenu(true)
            }}
        >{props.userName[0]}</Avatar>

        {props.open && <h5
            style={{ marginTop: 10, cursor: 'pointer' }}
            onClick={(e) => {
                setAnchorEl(e.currentTarget)
                setShowContextMenu(true)
            }}>{props.userName}</h5>}
    </Stack>
}