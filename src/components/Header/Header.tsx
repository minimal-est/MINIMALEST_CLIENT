import {IArchiveInfo} from "../../interfaces/dto/IArchiveInfo.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    color: ${theme.colors.charcoal};
`;

const StyledAuthor = styled.div`
    font-size: 1.5rem;
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

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${theme.colors.black};
`;

const MainTitleWrapper = styled.div`
    font-weight: bold;
    font-size: 2.5rem;
    word-break: break-all;
`;

const SubTitleWrapper = styled.div`
    font-size: 1.1rem;
`;

const Header = (props: IArchiveInfo) => {
    return (
        <StyledHeader>
            <AuthorInfoWrapper>
                {props.profileImageUrl &&
                    <ProfileWrapper>
                        <Profile src={props.profileImageUrl} />
                    </ProfileWrapper>
                }
                <StyledAuthor>@{props.author}</StyledAuthor>
            </AuthorInfoWrapper>
            <TitleWrapper>
                <MainTitleWrapper>
                    {props.mainTitle}
                </MainTitleWrapper>
                <SubTitleWrapper>
                    {props.subTitle}
                </SubTitleWrapper>
            </TitleWrapper>
        </StyledHeader>
    )
}

export default Header;