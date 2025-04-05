import React, {ChangeEvent, useRef} from "react";
import instance from "../../utils/instance.ts";
import {toast} from "react-toastify";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {AxiosError} from "axios";
import {IFileResponse} from "../../interfaces/dto/IFileResponse.ts";
import Thumbnail from "./Thumbnail.tsx";
import styled from "styled-components";
import Button from "../Button/Button.tsx";

interface Props {
    thumbnailUrl: string;
    onChangeThumbnailUrl: React.Dispatch<React.SetStateAction<string>>
}

const ThumbnailWrapper = styled.div`
    max-width: 100%;
    max-height: 400px;
    border-radius: 23px;
    overflow: hidden;
    
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PostThumbnailFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const ButtonGroupWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const HiddenInput = styled.input`
    display: none;
`;

const PostThumbnailForm = (props: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClickThumbnailUpload = () => {
        fileInputRef.current?.click();
    }

    const handleClickThumbnailReset = () => {
        props.onChangeThumbnailUrl("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const onChangeThumbnailFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const loadingToastId = toast.loading('썸네일 생성 중입니다..');


        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            toast.update(loadingToastId, {
                render: '이미지 파일만 업로드 해주세요!',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            })
            e.target.value = "";
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await instance.post<IApiResponse<IFileResponse>>(`/api/file`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            const data = response.data['data']!;

            props.onChangeThumbnailUrl(data.virtualUrl);

            toast.update(loadingToastId, {
                type: 'success',
                render: '업로드 성공!',
                isLoading: false,
                autoClose: 3000,
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                let message = '썸네일 업로드에 실패했습니다.';
                if (error.status === 413) {
                    message = '이미지 용량은 10MB 미만이여야 합니다!';
                }
                toast.update(loadingToastId, {
                    type: 'error',
                    render: message,
                    isLoading: false,
                    autoClose: 3000,
                })
                e.target.value = "";
            }
        }
    }

    return (
        <PostThumbnailFormWrapper>
            {props.thumbnailUrl && (
                <ThumbnailWrapper>
                    <Thumbnail src={props.thumbnailUrl} />
                </ThumbnailWrapper>
            )}
            <HiddenInput
                name="thumbnail"
                type="file"
                onChange={(e) => onChangeThumbnailFile(e)}
                accept="image/*"
                alt="thumbnail"
                ref={fileInputRef}
            />
            <ButtonGroupWrapper>
                <Button type='button' onClick={handleClickThumbnailUpload} color='black' size='small'>
                    썸네일 선택하기
                </Button>
                <Button type='button' size='small' onClick={handleClickThumbnailReset}>
                    초기화
                </Button>
            </ButtonGroupWrapper>
        </PostThumbnailFormWrapper>
    )
}

export default PostThumbnailForm;