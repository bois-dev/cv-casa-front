interface ImageViewerProps {
    src: any
}

export default function ImageViewer(props: ImageViewerProps) {
    return <div style={{
        textAlign: 'center'
    }}>
        <img style={{
            width: '60%',
            textAlign: 'center',
        }} src={props.src} alt={'Visualizar documento en formato de imagen'}/>
    </div>
}