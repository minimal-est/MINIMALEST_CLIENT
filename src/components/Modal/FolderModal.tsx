import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import FolderManager from "../Folder/FolderManager.tsx";

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
`;

const ModalContainer = styled.div`
    background-color: ${theme.colors.ghostwhite};
    padding: 20px;
    border-radius: 10px;
    max-height: 70vh;
    overflow-y: auto;
`;

interface Props {
    onClose: () => void;
    author: string;
}

const FolderModal = (props: Props) => {
    return (
        <ModalVisible onClick={props.onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <h3>⚙️ 폴더 관리</h3>
                <FolderManager author={props.author}/>
            </ModalContainer>
        </ModalVisible>
    )
}

export default FolderModal;