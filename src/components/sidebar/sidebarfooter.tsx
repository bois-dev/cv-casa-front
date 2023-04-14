import { Stack, Avatar } from '@mui/material';
import ContextMenu from '../context-menu/ctxmenu.component';
import { useState } from 'react';

const avatarSx = { cursor: 'pointer' }

export interface SidebarFooterProps {
    userName: string
}

export function ClosedSidebarFooter(props: SidebarFooterProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const [showContextMenu, setShowContextMenu] = useState(false);

    return <>
        <ContextMenu anchorEl={anchorEl!} open={showContextMenu} onClose={() => setShowContextMenu(false)} />
        <Avatar sx={avatarSx}
            onClick={(e) => {
                setAnchorEl(e.currentTarget)
                setShowContextMenu(true)
            }}>{props.userName[0]}</Avatar>
    </>
}


export function OpenedSidebarFooter(props: SidebarFooterProps) {
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

        <h5 style={{ marginTop: 10, cursor: 'pointer' }}>{props.userName}</h5>
    </Stack>
}