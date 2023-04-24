import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Typography } from '@mui/material';

interface ViewDocumentDialogProps {
    onClose: () => Promise<any>
}

export default function ViewHelpDocumentDialog(props: ViewDocumentDialogProps) {
    const variant = 'subtitle1'

    return (
        <div>
            <Dialog open maxWidth={'xl'} fullWidth>
                <DialogTitle>Ayuda - Guía de documentos</DialogTitle>
                <DialogContent>
                    <Divider sx={{ mb: 2 }}/>
                    <Typography variant={variant} fontWeight={'bold'}>
                        {'1. Documento de identificación: '}
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        Se suele requerir una copia del Documento Nacional de Identidad (DNI) o del pasaporte del arrendatario y del propietario, así como de cualquier otro co-arrendatario o avalista involucrado en el contrato de alquiler.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>
                    
                    <Typography variant={variant} fontWeight={'bold'}>
                        2. Justificación de ingresos:
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        Es común que se solicite una prueba de ingresos para demostrar la capacidad de pago del alquiler. Esto puede incluir copias de las últimas nóminas, contrato de trabajo, declaración de la renta o certificado de ingresos.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>

                    <Typography variant={variant} fontWeight={'bold'}>
                        3. Referencias personales y/o profesionales:
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        Algunos propietarios o agencias inmobiliarias pueden solicitar referencias personales o profesionales para evaluar la confiabilidad y solvencia del arrendatario.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>

                    <Typography variant={variant} fontWeight={'bold'}>
                        4. Contrato de trabajo o actividad empresarial: 
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        Si el arrendatario es empleado, es posible que se requiera una copia del contrato de trabajo. Si es autónomo o tiene un negocio propio, es posible que se solicite documentación que respalde su actividad empresarial.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>

                    <Typography variant={variant} fontWeight={'bold'}>
                        5. Garantías adicionales:
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        En algunos casos, el arrendador puede solicitar garantías adicionales, como un aval bancario o un seguro de impago de alquiler, para protegerse ante posibles incumplimientos del contrato de arrendamiento.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>

                    <Typography variant={variant} fontWeight={'bold'}>
                        6. Informe de solvencia crediticia: 
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        6. Informe de solvencia crediticia: Algunos propietarios o agencias inmobiliarias pueden solicitar un informe de solvencia crediticia del arrendatario, que puede obtenerse a través de agencias especializadas en la evaluación de la capacidad de pago.
                    </Typography>
                    <Divider sx={{ mb: 2 }}/>

                    <Typography variant={variant} fontWeight={'bold'}>
                        7. Otros documentos:
                    </Typography>
                    <Typography variant={variant} gutterBottom>
                        Dependiendo del caso, se pueden solicitar otros documentos, como referencias de anteriores arrendadores, un formulario de solicitud de alquiler completado, copias de cuentas bancarias o cualquier otra documentación que el propietario o agencia inmobiliaria considere relevante.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}