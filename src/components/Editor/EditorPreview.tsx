import DOMPurify from "dompurify";
import {QuillStyles} from "./QuillStyles.ts";

interface Props {
    content: string;
}

const EditorPreview = (props: Props) => {
    const santinizedHtmlContent = DOMPurify.sanitize(props.content);

    return (
        <QuillStyles>
            <div className='ql-container'>
                <div className='ql-editor' dangerouslySetInnerHTML={{__html: santinizedHtmlContent}} />
            </div>
        </QuillStyles>
    )
}

export default EditorPreview;