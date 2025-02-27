import Footer from "./Footer.tsx";
import styled from "styled-components";

const StyledFooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    
    padding-top: 20px;
    padding-bottom: 20px;
    
    background-color: rgba(0, 0, 0, 0.6);
`;

const FooterContainer = ()  => {
    return (
        <StyledFooterContainer>
            <Footer />
        </StyledFooterContainer>
    )
}

export default FooterContainer;