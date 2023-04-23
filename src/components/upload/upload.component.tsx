import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { blue } from '@mui/material/colors';
import { useRef, useState } from 'react';

interface UploadAreaProps {
    onFileSelected: (file: File) => Promise<any>
}

export default function UploadArea(props: UploadAreaProps) {
    const inputFile = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState('Seleccione al fichero')
    const [subtitleVisible, setSubtitleVisible] = useState(true)

    function onButtonClick() {
        inputFile.current!.click();
    }

    const onFileSelected = async (e: File) => {
        await setFileName(e.name)
        await setSubtitleVisible(false);

        props.onFileSelected(e);
    }

    const handleDrag = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            await setFileName('Solte el arquivo aquí')
            await setSubtitleVisible(false)
        } else if (e.type === "dragleave") {
            await setFileName('Procesando...')
            await setSubtitleVisible(true)
        }
    };

    const handleDrop = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await onFileSelected(e.dataTransfer.files[0] as File)
        }
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                borderStyle: 'dotted',
                borderColor: blue[400],
            }}
            onClick={onButtonClick}
        >
            <CardActionArea>
                <CardContent sx={{
                    display: 'flex',
                    verticalAlign: 'center',
                }}>
                    <FileUploadIcon sx={{
                        fontSize: 60,
                        margin: 2
                    }} />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: 200,
                    }}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <Typography gutterBottom variant="h6" component="div" sx={{
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word'
                        }}>
                            {fileName}
                        </Typography>
                        {subtitleVisible && <Typography variant="body2" color="text.secondary">
                            Ficheros PNG, JPG, JPEG, PDF, DOC, DOCX, XLS, XLSX solo. Tamaño maximo 20MB.
                        </Typography>}
                    </Box>
                    <input ref={inputFile} hidden accept="image/*;pdf" type="file" onChange={(e) => onFileSelected(e.target.files![0])} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
}