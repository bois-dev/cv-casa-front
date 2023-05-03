import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface AlertProps {
    title?:string,
    text: string,
    onCancel : () => Promise<any>,
    onConfirm : () => Promise<any>,
}

export default function AlertDialog(props : AlertProps) {    
  const { title, text, onCancel, onConfirm } = props;

  return (
      <Dialog
        open
        aria-labelledby={title ?? 'Atencion'}
        aria-describedby={text}
      >
        <DialogTitle id="alert-dialog-title">
          {title ?? 'Atención'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancela</Button>
          <Button onClick={onConfirm} autoFocus>
            Confirma
          </Button>
        </DialogActions>
      </Dialog>
  );
}