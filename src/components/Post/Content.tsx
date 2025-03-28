import ReactQuill from "react-quill";
import {QuillStyles} from "../Editor/QuillStyles.ts";
import DOMPurify from "dompurify";

interface Props {
    content: string;
}

const Content = (props: Props) => {
    const santinizedHtmlContent = DOMPurify.sanitize(props.content);

    return (
        <QuillStyles>
            <ReactQuill
                value={santinizedHtmlContent}
                readOnly={true}
                theme="snow"
                modules={{toolbar: false}}
                preserveWhitespace
            />
        </QuillStyles>
    )
}

export default Content;