import {toast} from "react-toastify";
import {AxiosError} from "axios";
import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IFileResponse} from "../../interfaces/dto/IFileResponse.ts";
import insertToTextArea from "./editorUtils.ts";
import React from "react";

export const handlePasteUpload = async (data: DataTransfer, onChange: React.Dispatch<React.SetStateAction<string>>) => {
    const files: File[] = [];
    for (let index = 0; index < data.items.length; index++) {
        const file = data.files.item(index);
        if (file) {
            files.push(file);
        }
    }

    await Promise.all(
        files.map(async (file) => {
            const url = await handleImage(file);
            if (!url || url === '') return;
            const insertedMarkdown = insertToTextArea(`![이미지 설명](${url})`);
            if (!insertedMarkdown) return;
            onChange(insertedMarkdown);
        })
    )
}

export const handleImage = async (file: File | string) => {
    const loadingToastId = toast.loading('이미지 업로드 중입니다..');

    try {
        // 바이너리 문자열일 경우, 파일로 변환
        if (typeof file === 'string' && file.startsWith('data:image')) {
            const blob = await fetch(file).then(r => r.blob());
            file = new File([blob], 'image.png', {type: blob.type});
        }

        const imageUrl = await handleImageUpload(file as File);

        toast.update(loadingToastId, {
            render: '이미지 업로드 성공',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
        });

        return imageUrl;
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

        return '';
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