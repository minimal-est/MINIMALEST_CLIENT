import {IArchiveInfo} from "../../interfaces/dto/IArchiveInfo.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

const StyledHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledAuthor = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: ${theme.colors.ghostwhite};
`;

const Header = (props: IArchiveInfo) => {
    return (
        <StyledHeader>
            <StyledAuthor>{props.author}</StyledAuthor>
            <div>{props.mainTitle}</div>
        </StyledHeader>
    )
}

export default Header;