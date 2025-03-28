import React, {useEffect, useMemo, useRef} from "react";
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import ImageDropAndPaste from "quill-image-drop-and-paste";

import {initCustomIcons} from "./quillIcons.ts";
import {handleImageButtonClick, handleImage} from "./quillHandlers.ts";

Quill.register('modules/imageDropAndPaste', ImageDropAndPaste)

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
        imageDropAndPaste: {
            handler: (file: File | string) => handleImage(file, quillRef)
        }
    }), [quillRef]);

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const toolbar = quill.getModule('toolbar');
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
                preserveWhitespace
            />
        </div>
    );
};

export default Editor;