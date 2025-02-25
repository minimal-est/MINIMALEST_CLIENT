import React from "react";
import FooterContainer from "../components/Footer/FooterContainer.tsx";

interface Props {
    children: React.ReactNode;
}

const MainLayout = (props: Props) => {
    return (
        <div>
            <h3>포스트를 위해 .MD 파일 업로드부터 직접 작성.. 모두 가능한 'Minimalest'</h3>
            <hr />
            {props.children}
            <hr />
            <FooterContainer />
        </div>
    )
}

export default MainLayout;