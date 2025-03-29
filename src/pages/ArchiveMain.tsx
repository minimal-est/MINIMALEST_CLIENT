import {useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostPreviewsContainer from "../components/Post/PostPreviewsContainer.tsx";
import RepresentativePostViewContainer from "../components/Post/RepresentativePostViewContainer.tsx";
import styled from "styled-components";
import {Helmet} from "react-helmet-async";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`;

const StyledRecentPostPreviews = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ArchiveMain = () => {

    const params = useParams();
    const author = params.author ?? "";

    return (
        <ArchiveLayout author={author}>
            {/* Meta data */}
            <Helmet>
                <title>@{author} 아카이브</title>
                <meta name='description' content={author + "님의 아카이브에서 글을 통해 영감을 받아보세요."}/>
                <meta name='author' content={author}/>
            </Helmet>

            <StyledContainer>
                <RepresentativePostViewContainer author={author} />
                <StyledRecentPostPreviews>
                    <PostPreviewsContainer author={author} />
                </StyledRecentPostPreviews>
            </StyledContainer>
        </ArchiveLayout>
    );
};

export default ArchiveMain;