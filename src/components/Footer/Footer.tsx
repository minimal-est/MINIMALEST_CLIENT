import styled from "styled-components";

const StyledFooter = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <a href=''>개인정보처리방침</a>
            <a href='https://github.com/minimal-est'>Github</a>
        </StyledFooter>
    )
}

export default Footer;