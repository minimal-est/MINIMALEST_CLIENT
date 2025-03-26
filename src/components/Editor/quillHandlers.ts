import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IFileResponse} from "../../interfaces/dto/IFileResponse.ts";
import React from "react";
import ReactQuill, {Quill} from "react-quill-new";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

export const handleImageButtonClick = (quillRef: React.RefObject<ReactQuill>) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
            await handleImage(file, quillRef);
        }
    }
}

export const handleImage = async (file: File | string, quillRef: React.RefObject<ReactQuill | null>) => {
    const loadingToastId = toast.loading('이미지 업로드 중입니다..');

    try {
        // 바이너리 문자열일 경우, 파일로 변환
        if (typeof file === 'string' && file.startsWith('data:image')) {
            const blob = await fetch(file).then(r => r.blob());
            file = new File([blob], 'image.png', {type: blob.type});
        }

        const imageUrl = await handleImageUpload(file as File);

        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            if (range) {
                quill.insertEmbed(range.index, 'image', imageUrl, Quill.sources.USER);
            }
        }

        toast.update(loadingToastId, {
            render: '이미지 업로드 성공',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
        });
    } catch (error: unknown) {
        let message = '이미지 업로드에 실패했습니다!';
        if (error instanceof AxiosError) {
            // 용량이 너무 클 때
            if (error.status === 413) {
                message = '이미지 용량이 너무 큽니다 (제한 10MB)';
            }
        }
        toast.update(loadingToastId, {
            render: message,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
        });
    }
};

const handleImageUpload = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 가능합니다!');
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await instance.post<IApiResponse<IFileResponse>>('/api/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    const imageUrl = response.data.data?.virtualUrl;

    if (!imageUrl) {
        throw new Error('이미지 URL을 불러올 수 없습니다!');
    }

    return imageUrl;
}