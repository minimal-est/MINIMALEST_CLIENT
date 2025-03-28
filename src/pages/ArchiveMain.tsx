import {useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostPreviewsContainer from "../components/Post/PostPreviewsContainer.tsx";
import RepresentativePostViewContainer from "../components/Post/RepresentativePostViewContainer.tsx";
import styled from "styled-components";

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