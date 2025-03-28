import {useNavigate, useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostCreateContainer from "../components/Post/PostCreateContainer.tsx";
import React, {useEffect, useState} from "react";
import usePostCreate from "../hooks/api/usePostCreate.tsx";
import {toast} from "react-toastify";
import useFolderFlat from "../hooks/api/useFolderFlat.tsx";
import validateAuthorFromEmailToken from "../utils/validateAuthorFromEmailToken.ts";
import {AxiosError} from "axios";
import {IPostCreateResponse} from "../interfaces/dto/IPostCreateResponse.ts";
import usePostModify from "../hooks/api/usePostModify.tsx";
import usePostView from "../hooks/api/usePostView.tsx";

interface Props {
    modifyMode: boolean;
}

const ArchivePostCreate = (props: Props) => {

    const params = useParams();
    const author = params.author ?? "";
    const sequence = params.sequence ? Number(params.sequence) : -1;
    const navigate = useNavigate();

    const {mutate: createMutate} = usePostCreate(author);
    const {mutate: modifyMutate} = usePostModify(author, sequence);
    const {data: postViewData} = usePostView(author, sequence);
    const [postValue, setPostValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [selectedFolder, setSelectedFolder] = useState<{value: number, label: string}>({value: -1, label: ''});
    const {data: folderData,} = useFolderFlat(author);

    useEffect(() => {
        if (props.modifyMode) {
            // 포스트 검증
            if (!postViewData || sequence < 0) {
                toast.error('잘못된 접근입니다!', {
                    autoClose: 3000,
                })
                navigate(`/archive/${author}`);
            }

            // 입력값 채우기
            if (postViewData) {
                setPostValue(postViewData.content);
                setTitleValue(postViewData.title);
                setSelectedFolder({value: postViewData.folderId, label: postViewData.folderName});
            }
        }
    }, []);

    useEffect(() => {
        const validateLogin = async () => {
            const validationRes = await validateAuthorFromEmailToken(author);
            if (!validationRes.isValid) {
                toast.error('권한이 없습니다. 로그인 해주세요!', {
                    autoClose: 3000,
                })
                navigate(`/archive/${author}`);
            }
        }

        validateLogin();
    }, []);

    useEffect(() => {
        if (!props.modifyMode && folderData && folderData.length > 0) {
            setSelectedFolder({value: folderData[0].id, label: folderData[0].name})
        }
    }, [folderData]);

    const onChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    }

    const onClickCreate = () => {
        const loadingToastId = toast.loading('포스트 생성 중입니다..');

        const data = {
            title: titleValue,
            content: postValue,
            folderId: selectedFolder?.value ?? -1,
        };

        const mutationOptions = {
            onSuccess: (data: IPostCreateResponse) => {
                // 포스트 발행 성공 시
                toast.update(loadingToastId, {
                    render: props.modifyMode ? '포스트 수정 성공!✏️' : '포스트 생성 성공! 🎉',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                })
                navigate(`/archive/${data.author}/${data.sequence}`);
            },
            onError: (error: AxiosError) => {
                let errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시해주세요.' +error;

                if (error.status === 400) {
                    errorMessage = '입력값이 비어있는지 확인해주세요!';
                } else if (error.status === 401) {
                    errorMessage = '권한이 없습니다! 로그인 먼저 해주세요.';
                }

                toast.update(loadingToastId, {
                    render: errorMessage,
                    type: 'error',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        }

        if (props.modifyMode) {
            // 수정 모드라면
            modifyMutate(data, mutationOptions);
        } else {
            createMutate(data, mutationOptions);
        }
    }

    const onClickSaveDraft = () => {

    }

    return (
        <ArchiveLayout author={author}>
            <PostCreateContainer
                postValue={postValue}
                onChangePostValue={setPostValue}
                titleValue={titleValue}
                onChangeTitleValue={onChangeTitleValue}
                create={onClickCreate}
                saveDraft={onClickSaveDraft}
                folders={folderData || []}
                folder={selectedFolder}
                onChangeFolder={setSelectedFolder}
                author={author}
                isModifyMode={props.modifyMode}
            />
        </ArchiveLayout>
    );
};

export default ArchivePostCreate;