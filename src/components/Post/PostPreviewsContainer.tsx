import usePostPreviews from "../../hooks/api/usePostPreviews.tsx";
import PostPreviews from "./PostPreviews.tsx";
import Button from "../Button/Button.tsx";
import styled from "styled-components";

interface Props {
    author: string;
}

const StyledPostPreviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const PostPreviewsContainer = (props: Props) => {
    const {data, isError, fetchNextPage, hasNextPage} = usePostPreviews(props.author);

    if (isError) {
        return <p>😢 포스트를 불러올 수 없습니다..</p>
    }

    return (
        <StyledPostPreviewsContainer>
            <PostPreviews postPreviews={data?.pages.flatMap((page) => page.content) || []} />

            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage}
            >
                {hasNextPage ? '더 불러오기' : '...'}
            </Button>
        </StyledPostPreviewsContainer>
    )
}

export default PostPreviewsContainer;