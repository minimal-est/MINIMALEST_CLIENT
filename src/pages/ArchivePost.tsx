import {useNavigate, useParams} from "react-router-dom";
import usePostView from "../hooks/api/usePostView.tsx";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostView from "../components/Post/PostView.tsx";
import {toast} from "react-toastify";
import Spinner from "../components/common/Spinner.tsx";

const ArchivePost = () => {
    const params = useParams();
    const author = params.author ?? '';
    const sequence = Number(params.sequence ?? -1);

    const navigate = useNavigate();

    const {data: postView, isLoading, isError, error} = usePostView(author, sequence);

    if (isError) {
        toast.error(`포스트를 불러오는 데 실패했습니다! ${error?.message}`, {
            autoClose: 3000,
        })
        navigate(`/${author}`);
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
                      lastModifiedAt={postView.lastModifiedAt}
                />
            }
        </ArchiveLayout>
    )
}

export default ArchivePost;