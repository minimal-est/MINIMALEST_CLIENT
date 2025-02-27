import HeaderContainer from "../components/Header/HeaderContainer.tsx";
import React from "react";
import FooterContainer from "../components/Footer/FooterContainer.tsx";
import styled from "styled-components";

interface Props {
    author: string;
    children: React.ReactNode;
}

const StyledArchiveLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    
    min-height: 100vh;
`;

const ArchiveLayout = (props: Props) => {

    return (
        <StyledArchiveLayout>
            <HeaderContainer author={props.author} />
            {props.children}
            <FooterContainer />
        </StyledArchiveLayout>
    );
}

export default ArchiveLayout;