import {useNavigate, useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostCreateContainer from "../components/Post/PostCreateContainer.tsx";
import React, {useEffect, useState} from "react";
import usePostCreate from "../hooks/api/usePostCreate.tsx";
import {toast} from "react-toastify";
import useFindAndValidateMember from "../hooks/api/useFindAndValidateMember.tsx";
import getEmailFromToken from "../utils/getEmailFromToken.ts";
import useFolderFlat from "../hooks/api/useFolderFlat.tsx";

const ArchivePostCreate = () => {

    const params = useParams();
    const author = params.author ?? "";

    const {mutate} = usePostCreate(author);

    const [postValue, setPostValue] = useState<string>("");
    const [titleValue, setTitleValue] = useState<string>("");
    const [selectedFolder, setSelectedFolder] = useState<{value: number, label: string}>({value: -1, label: ''});
    const navigate = useNavigate();

    const {
        data: memberData,
        // isLoading: memberIsLoading
        isError: memberIsError,
    } = useFindAndValidateMember(getEmailFromToken, author);

    const {
        data: folderData,
    } = useFolderFlat(author);

    useEffect(() => {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        if (memberIsError) {
            toast.error('로그인 상태가 아닙니다. 로그인 후 다시 시도해주세요.');
            navigate(`/${author}`); // 로그인 페이지로 리디렉션
        }
    }, [memberIsError, memberData, navigate]);

    useEffect(() => {
        if (folderData && folderData.length > 0) {
            setSelectedFolder({value: folderData[0].id, label: folderData[0].name})
        }
    }, [folderData]);

    const onChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    }

    const onClickCreate = () => {
        const loadingToastId = toast.loading('포스트 생성 중입니다..');

        mutate(
            {
                title: titleValue,
                content: postValue,
                folderId: selectedFolder?.value ?? -1,
            },
            {
                onSuccess: (data) => {
                    // 포스트 발행 성공 시
                    toast.update(loadingToastId, {
                        render: '포스트 생성 성공! 🎉',
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000,
                    })
                    navigate(`/${data.author}/${data.sequence}`);
                },
                onError: (error) => {
                    let errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시해주세요.';

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
                    })
                }
            }
        )
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
            />
        </ArchiveLayout>
    );
};

export default ArchivePostCreate;