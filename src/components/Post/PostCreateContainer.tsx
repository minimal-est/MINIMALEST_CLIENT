import Editor from "../Editor/Editor.tsx";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import {IPostCreateProps} from "../../interfaces/IPostCreateProps.ts";
import {QuillStyles} from "../Editor/QuillStyles.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import PostFolderSelect from "./PostFolderSelect.tsx";
import {useState} from "react";
import FolderModal from "../Modal/FolderModal.tsx";

const StyledPostCreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;

    width: 100%;
    max-width: 900px;
    padding: 20px;
    
    border-radius: 10px;
    background-color: ${theme.colors.ghostwhite};
`;

const StyledEditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    width: 100%;
`;

const StyledButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
`;

const FolderSelectWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    z-index: 2;
`;

const PostCreateContainer = (props: IPostCreateProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModel = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <StyledPostCreateContainer>
            <StyledEditorContainer>
                <FolderSelectWrapper>
                    <div>📁</div>
                    <PostFolderSelect
                        author={props.author}
                        value={props.folder}
                        onChange={props.onChangeFolder}
                        folders={props.folders}
                    />
                    <Button size="small" onClick={openModel}>관리</Button>
                </FolderSelectWrapper>
                <Input
                    value={props.titleValue}
                    onChange={props.onChangeTitleValue}
                    isTitle={true} placeholder="포스트 제목을 입력해주세요."
                />
                <QuillStyles>
                    <Editor value={props.postValue} onChange={props.onChangePostValue} />
                </QuillStyles>
            </StyledEditorContainer>
            <StyledButtonsWrapper>
                <Button color="black" onClick={props.create}>
                    {props.isModifyMode ? '변경하기' : '발행하기'}
                </Button>
                <Button color="white" onClick={props.saveDraft} disabled>임시저장</Button>
            </StyledButtonsWrapper>

            {/* 모달 여부 */}
            {isModalOpen && <FolderModal onClose={closeModal} author={props.author}/>}
        </StyledPostCreateContainer>
    )
}

export default PostCreateContainer;