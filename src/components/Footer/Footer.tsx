import styled from "styled-components";
import {Link} from "react-router-dom";
import {theme} from "../styles/theme.ts";

const StyledFooter = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    
    color: ${theme.colors.ghostwhite};
    font-size: 14px;
`;

const StyledCopyright = styled.div`
    font-size: 13px;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <StyledCopyright>ⓒ 2025. 31n5ang(Minsang Song) All rights reserved.</StyledCopyright>
            {/*<Link to=''>개인정보처리방침</Link>*/}
            <Link to='https://github.com/minimal-est'>Github</Link>
        </StyledFooter>
    )
}

export default Footer;