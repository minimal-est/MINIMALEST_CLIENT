import {IPostPreview} from "../../interfaces/dto/IPostPreview.ts";
import PostPreview from "./PostPreview.tsx";
import styled from "styled-components";

interface Props {
    postPreviews: Array<IPostPreview>;
}

const StyledPostPreviews = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 900px;
    
    @media (max-width: 900px) {
        width: 100%;
    }
`;

const PostPreviews = (props: Props) => {
    return (
        <StyledPostPreviews>
            {props.postPreviews.map((postPreview, index) => (
                <PostPreview
                    key={index}
                    author={postPreview.author}
                    title={postPreview.title}
                    summary={postPreview.summary}
                    sequence={postPreview.sequence}
                    thumbnailUrl={postPreview.thumbnailUrl}
                    createdAt={postPreview.createdAt}
                    lastModifiedAt={postPreview.lastModifiedAt}
                    folderName={postPreview.folderName}
                />
            ))}
        </StyledPostPreviews>
    );
}

export default PostPreviews;