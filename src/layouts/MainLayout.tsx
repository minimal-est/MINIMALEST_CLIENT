import React from "react";
import FooterContainer from "../components/Footer/FooterContainer.tsx";
import {StyledTitle} from "../components/Post/postView.styles.ts";

interface Props {
    children: React.ReactNode;
}

const MainLayout = (props: Props) => {
    return (
        <div>
            <StyledTitle>더 빠르고 간단한 글쓰기. Minimalest</StyledTitle>
            {props.children}
            <FooterContainer />
        </div>
    )
}

export default MainLayout;