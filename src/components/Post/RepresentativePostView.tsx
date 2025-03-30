import MarkdownPreview from "../Editor/MarkdownPreview.tsx";
import {EditorStyles} from "../Editor/editorStyles.ts";

interface Props {
    content: string;
}

const RepresentativePostView = (props: Props) => {
    return (
        <EditorStyles>
            <MarkdownPreview content={props.content} />
        </EditorStyles>
    )
}

export default RepresentativePostView;