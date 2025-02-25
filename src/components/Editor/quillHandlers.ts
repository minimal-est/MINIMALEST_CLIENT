import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IFileResponse} from "../../interfaces/dto/IFileResponse.ts";
import React from "react";
import ReactQuill, {Quill} from "react-quill-new";
import {toast} from "react-toastify";

export const handleDividerButtonClick = (quillRef: React.RefObject<ReactQuill>) => {
    const quill = quillRef.current?.getEditor(); // Quill 인스턴스를 가져옵니다.
    console.log(quill);
    if (quill) {
        const range = quill.getSelection();
        if (range) {
            quill.insertText(range.index, '\n', Quill.sources.USER);
            quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
            quill.setSelection(range.index + 2, Quill.sources.SILENT);
        }
    }
};

export const handleImageButtonClick = (quillRef: React.RefObject<ReactQuill>) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            await handleImageUpload(file, quillRef);
        }
    }
}

const handleImageUpload = async (file: File, quillRef: React.RefObject<ReactQuill>) => {
    if (!file.type.startsWith('image/')) {
        toast.error('이미지만 가능합니다!', {
            autoClose: 3000,
        });
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

        const response = await instance.post<IApiResponse<IFileResponse>>('/api/file', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const imageUrl = response.data.data?.virtualUrl;

        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, 'image', imageUrl, Quill.sources.USER);
            }
        }
    } catch (error) {
        toast.error('이미지 업로드에 실패했습니다.', {
            autoClose: 3000,
        });
    }
}