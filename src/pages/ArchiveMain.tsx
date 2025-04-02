import {Link, useParams} from "react-router-dom";
import ArchiveLayout from "../layouts/ArchiveLayout.tsx";
import PostPreviewsContainer from "../components/Post/PostPreviewsContainer.tsx";
import RepresentativePostViewContainer from "../components/Post/RepresentativePostViewContainer.tsx";
import styled from "styled-components";
import {Helmet} from "react-helmet-async";
import {useEffect, useState} from "react";
import validateFromEmailToken from "../utils/validateFromEmailToken.ts";
import Button from "../components/Button/Button.tsx";

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
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isMemberLoading, setIsMemberLoading] = useState<boolean>(true);
    const [isMember, setIsMember] = useState<boolean>(false);
    // const [emailIfMember, setEmailIfMember] = useState<string | undefined>("");

    const updateIsMember = async () => {
        const memberValidation = await validateFromEmailToken();
        setIsMember(memberValidation.isValid);
        // setEmailIfMember(memberValidation.email);
        setIsAdminMode(memberValidation.isValid);
        setIsMemberLoading(false);
    }

    useEffect(() => {
        updateIsMember();
    }, []);

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
                {!isMemberLoading && isMember && isAdminMode && (
                    <Link to={`/archive/${author}/create`}>
                        <Button type='button' size='medium' color='black'>포스트 작성하기 ✍🏻</Button>
                    </Link>
                )}
                <RepresentativePostViewContainer author={author} />
                <StyledRecentPostPreviews>
                    <PostPreviewsContainer author={author} />
                </StyledRecentPostPreviews>
            </StyledContainer>
        </ArchiveLayout>
    );
};

export default ArchiveMain;