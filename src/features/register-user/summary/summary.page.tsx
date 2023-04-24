import { Box } from "@mui/material"
import { SliceProps } from "../register-user.interfaces"
import SummarySubtitle from "./summary-subtitle.page";
import SummaryInfoItem from "./summary-info-item.page";
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export default function Summary(props: SliceProps) {
    const { current } = props;
    
    return <>
        <Box sx={{
            width: '100%',
            mt: 8,
            padding: 4,
            alignItems: 'center',
            backgroundColor: 'whitesmoke',
            borderRadius: '20px',
            overflowY: "scroll",
            height: 600,
        }}>
            <SummarySubtitle title="Dados generales" icon={<PersonIcon />} />
            <SummaryInfoItem primary="Nombre y Apelidos" secondary={current?.fullname ?? 'FAVOR INFORMAR'} bottomDivider />
            <SummaryInfoItem primary="Idade" secondary={current?.age ?? '0'} bottomDivider />
            <SummaryInfoItem primary="Cuantas personas van a vivir con usted" secondary={current?.peopleQt ?? '0'} bottomDivider />
            <SummaryInfoItem primary="Cuanto gustaria pagar al mes" secondary={current?.wantsToPay ?? '0'} bottomDivider />
            <SummaryInfoItem primary="Cuantos meses en adelanto puede pagar" secondary={current?.antecipateRents ?? '0'} bottomDivider />
            <SummaryInfoItem primary="Tengo hijo(s) pequeño(s)" secondary={(current && current.hasKids !== undefined) ? (current.hasKids ? 'Si' :  'No') : 'No'} bottomDivider />
            <SummaryInfoItem primary="Tengo mascota" secondary={(current && current.hasPets !== undefined) ? (current.hasPets ? 'Si' :  'No') : 'No'} bottomDivider />
            <SummaryInfoItem primary="Ya estoy en España" secondary={(current && current.alreadyInSpain !== undefined) ? (current.alreadyInSpain ? 'Si' :  'No') : 'No'} bottomDivider />
            <SummaryInfoItem primary="Puedo residir legalmente en España" secondary={(current && current.hasDocs !== undefined) ? (current.hasDocs ? 'Si' :  'No') : 'No'} bottomDivider={false} />

            <SummarySubtitle title="Contactos" sx={{ mt: 5 }} icon={<ConnectWithoutContactIcon />}  />
            <SummaryInfoItem primary="Teléfono" secondary={current?.contacts?.tel ?? '-'} bottomDivider />
            <SummaryInfoItem primary="Mobile" secondary={current?.contacts?.cel ?? '-'} bottomDivider />
            <SummaryInfoItem primary="Correo eletrónico" secondary={current?.contacts?.email ?? '-'} bottomDivider />
            <SummaryInfoItem primary="Instagram" secondary={current?.contacts?.instagram ?? '-'} bottomDivider />
            <SummaryInfoItem primary="Facebook" secondary={current?.contacts?.facebook ?? '-'} bottomDivider />
            <SummaryInfoItem primary="LinkedIn" secondary={current?.contacts?.linkedin ?? '-'} bottomDivider />
            
            <SummarySubtitle title="Documentos" sx={{ mt: 5 }} icon={<ArticleIcon />}  />
            <SummaryInfoItem primary="Numero de documentos añadidos" secondary={current?.documents?.length ?? '0'} bottomDivider={false} />
        </Box>
    </>
}