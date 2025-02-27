import {IArchiveInfo} from "../../interfaces/dto/IArchiveInfo.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const StyledAuthor = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: ${theme.colors.ghostwhite};
`;

const ProfileWrapper = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
`;

const Profile = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const AuthorInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Header = (props: IArchiveInfo) => {
    return (
        <StyledHeader>
            <AuthorInfoWrapper>
                <ProfileWrapper>
                    <Profile src={props.profile_image_url} />
                </ProfileWrapper>
                <StyledAuthor>{props.author}</StyledAuthor>
            </AuthorInfoWrapper>
            <div>{props.mainTitle}</div>
        </StyledHeader>
    )
}

export default Header;