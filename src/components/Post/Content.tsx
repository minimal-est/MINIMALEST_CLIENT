import ReactQuill from "react-quill-new";
import {QuillStyles} from "../Editor/QuillStyles.ts";

interface Props {
    content: string;
}

const Content = (props: Props) => {
    return (
        <QuillStyles>
            <ReactQuill
                value={props.content}
                readOnly={true}
                theme="snow"
                modules={{toolbar: false}}
            />
        </QuillStyles>
    )
}

export default Content;