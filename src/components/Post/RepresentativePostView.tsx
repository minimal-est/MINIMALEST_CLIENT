import Content from "./Content.tsx";

interface Props {
    content: string;
}

const RepresentativePostView = (props: Props) => {
    return (
        <div>
            <Content content={props.content} />
        </div>
    )
}

export default RepresentativePostView;