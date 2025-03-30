import {EditorStyles} from "./editorStyles.ts";
import MDEditor from "@uiw/react-md-editor";

interface Props {
    content: string;
}

const MarkdownPreview = (props: Props) => {
    return (
        <EditorStyles data-color-mode="light">
            <MDEditor.Markdown
                source={props.content}
            />
        </EditorStyles>
    );
}

export default MarkdownPreview;