interface AskTitleProps {
    text: string
}

export default function PageTitle(props: AskTitleProps) {
    return <h2
        style={{
            marginTop: 8,
            marginLeft: 10
        }}
    >{props.text}</h2>
}