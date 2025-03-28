import React from "react";
import FooterContainer from "../components/Footer/FooterContainer.tsx";
import {StyledTitle} from "../components/Post/postView.styles.ts";
import styled from "styled-components";

interface Props {
    children: React.ReactNode;
}

const MainLayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const MinimalestWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

const LogoWrapper = styled.div`
    
`;

const Logo = styled.img`

`;

const MainLayout = (props: Props) => {
    return (
        <MainLayoutWrapper>
            <TitleWrapper>
                <MinimalestWrapper>
                    <LogoWrapper>
                        <Logo src='/assets/M.png' />
                    </LogoWrapper>
                    <StyledTitle>
                        inimalest.kr
                    </StyledTitle>
                </MinimalestWrapper>
                <StyledTitle>
                    더 빠르고, 더 가벼운 글쓰기
                </StyledTitle>
            </TitleWrapper>
                {props.children}
            <FooterContainer />
        </MainLayoutWrapper>
    )
}

export default MainLayout;