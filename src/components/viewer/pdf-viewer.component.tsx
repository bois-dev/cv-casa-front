interface PdfViewerProps {
    src: any
}

export default function PdfViewer(props: PdfViewerProps) {
    return <object style={{
        height: '800px',
        width: '100%'
    }} data={props.src} type="application/pdf" aria-label={'Visualizar documiento PDF'}/>
}