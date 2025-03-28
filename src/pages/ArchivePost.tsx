import {useNavigate, useParams} from "react-router-dom";
import usePostView from "../hooks/api/usePostView.tsx";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostView from "../components/Post/PostView.tsx";
import {toast} from "react-toastify";
import Spinner from "../components/common/Spinner.tsx";
import {useEffect, useState} from "react";
import validateAuthorFromEmailToken from "../utils/validateAuthorFromEmailToken.ts";
import useSetRepresentativePost from "../hooks/api/useSetRepresentativePost.tsx";
import {useQueryClient} from "@tanstack/react-query";
import useSetNonePost from "../hooks/api/useSetNonePost.tsx";
import usePostDelete from "../hooks/api/usePostDelete.tsx";

const ArchivePost = () => {
    const params = useParams();
    const author = params.author ?? '';
    const sequence = Number(params.sequence ?? -1);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {data: postView, isLoading, isError, error} = usePostView(author, sequence);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const {mutate: setRepresentativeMutate} = useSetRepresentativePost();
    const {mutate: setNoneMutate} = useSetNonePost();
    const {mutate: deleteMutate} = usePostDelete();

    useEffect(() => {
        const validateLogin = async () => {
            const validationRes = await validateAuthorFromEmailToken(author);
            setIsAuthenticated(validationRes.isValid);
        }

        validateLogin();
    }, []);

    if (isError) {
        toast.error(`포스트를 불러오는 데 실패했습니다! ${error?.message}`, {
            autoClose: 3000,
        })
        navigate(`/archive/${author}`);
    }

    const onSetRepresentative = async () => {
        // 대표 포스트 설정
        setRepresentativeMutate({
            author: author,
            sequence: sequence,
        }, {
            onSuccess: () => {
                //리패치
                queryClient.invalidateQueries({
                    queryKey: ['postView']
                });
                toast.success('대표 포스트로 설정되었습니다!', {
                    autoClose: 3000,
                });
            },
            onError: () => {
                toast.error('실패했습니다! 잠시 후 다시 시도해주세요!', {
                    autoClose: 3000,
                })
            }
        });
    }

    const onSetNone = async () => {
        // 대표 포스트 설정
        setNoneMutate({
            author: author,
            sequence: sequence,
        }, {
            onSuccess: () => {
                //리패치
                queryClient.invalidateQueries({
                    queryKey: ['postView']
                });
                toast.success('일반 포스트로 변경되었습니다!', {
                    autoClose: 3000,
                });
            },
            onError: () => {
                toast.error('실패했습니다! 잠시 후 다시 시도해주세요!', {
                    autoClose: 3000,
                })
            }
        });
    }
    
    const onDelete = async () => {
        deleteMutate({
            author: author,
            sequence: sequence,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['slicePostPreviews']
                });
                navigate(`/archive/${author}`);
                toast.success('포스트가 삭제되었습니다!', {
                    autoClose: 3000,
                });
            },
            onError: () => {
                toast.error('실패했습니다! 잠시 후 다시 시도해주세요!', {
                    autoClose: 3000,
                });
            }
        })
    }

    const onEdit = async () => {
        navigate(`/archive/${author}/${sequence}/modify`);
    }

    return (
        <ArchiveLayout author={author}>
            {isLoading && <Spinner />}
            {!isLoading && postView &&
                <PostView author={postView.author}
                      title={postView.title}
                      content={postView.content}
                      folderId={postView.folderId}
                      folderName={postView.folderName}
                      createdAt={postView.createdAt}
                      postRole={postView.postRole}
                      hitCount={postView.hitCount}
                      lastModifiedAt={postView.lastModifiedAt}
                      isModified={postView.isModified}
                      isAuthenticated={isAuthenticated}
                      onSetRepresentative={onSetRepresentative}
                      onUnsetRepresentative={onSetNone}
                      onModify={onEdit}
                      onDelete={onDelete}
                />
            }
        </ArchiveLayout>
    )
}

export default ArchivePost;