import usePostPreviews from "../../hooks/api/usePostPreviews.tsx";
import PostPreviews from "./PostPreviews.tsx";
import Button from "../Button/Button.tsx";
import styled from "styled-components";
import TextWithAccent from "../Text/TextWithAccent.tsx";

interface Props {
    author: string;
}

const StyledPostPreviewsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
`;

const RecentPostWrapper = styled.div`
    font-size: 1.2rem;
`;

const NoPostWrapper = styled.div`
    font-size: 1.5rem;
`;

const PostPreviewsContainer = (props: Props) => {
    const {data, isError, fetchNextPage, hasNextPage} = usePostPreviews(props.author);

    if (isError) {
        return <p>😢 포스트를 불러올 수 없습니다..</p>
    }

    return (
        <StyledPostPreviewsContainer>
            {data?.pages.some((page) => page.content.length > 0) ?
                // 포스트가 존재한다면
                <RecentPostWrapper>
                    <TextWithAccent>
                        새로운 글
                    </TextWithAccent>
                </RecentPostWrapper>
                :
                // 포스트가 존재하지 않는다면
                <NoPostWrapper>
                    {props.author}작가님은 생각에 잠기셨습니다..💭
                </NoPostWrapper>
            }

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