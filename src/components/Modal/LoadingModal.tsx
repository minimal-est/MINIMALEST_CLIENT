import styled from "styled-components";
import Spinner from "../common/Spinner.tsx";
import {theme} from "../styles/theme.ts";

const ModalVisible = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    
    flex-direction: column;
    gap: 20px;
`;

const SpanWrapper = styled.div`
    color: ${theme.colors.ghostwhite};
    font-size: 20px;
    
`;

const LoadingModal = () => {
    return (
        <ModalVisible>
            <SpanWrapper>포스팅 업로드 중..☕️</SpanWrapper>
            <SpanWrapper>최대 20초까지 소요될 수 있습니다.</SpanWrapper>
            <div><Spinner /></div>
        </ModalVisible>
    )
}

export default LoadingModal;