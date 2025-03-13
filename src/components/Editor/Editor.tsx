import React, {useEffect, useMemo, useRef} from "react";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

import {initCustomIcons} from "./quillIcons.ts";
import {handleImageButtonClick} from "./quillHandlers.ts";

interface Props {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}


const Editor = (props: Props) => {
    const quillRef = useRef<ReactQuill>(null);

    initCustomIcons();

    const modules = useMemo(() => ({
        toolbar: [
            [{'header' : '1'}, {'header' : '2'}, {'header' : '3'}],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['blockquote'],
            ['link', 'image'],
            [{ 'align' : [] }],
            ['code'],
            ['code-block'],
            ['clean'],
        ],
    }), []);

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const toolbar = quill.getModule('toolbar');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            toolbar.addHandler('image', () => handleImageButtonClick(quillRef));
        }
    }, []);

    return (
        <div>
            <ReactQuill
                theme='snow'
                ref={quillRef}
                value={props.value}
                onChange={props.onChange}
                modules={modules}
                placeholder={`"첫 줄을 쓰는 것은 어마어마한 공포이자 마술이며, 기도인 동시에 수줍음이다" - 작가<존 스타인벡>.`}
            />
        </div>
    );
};

export default Editor;