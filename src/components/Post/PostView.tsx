import {IPostView} from "../../interfaces/dto/IPostView.ts";
import ReactQuill from "react-quill-new";
import {QuillStyles} from "../Editor/QuillStyles.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import TextWithBackground from "../Text/TextWithBackground.tsx";

const StyledPostView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${theme.colors.ghostwhite};
    padding: 20px;
    border-radius: 10px;
    
    @media (max-width: 900px) {
        width: 95%;
    }
`;

const StyledTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: ${theme.colors.charcoal};
`;

const StyledDivider = styled.hr`
    width: 100%;
    margin: 20px 0;
    border: none;
    height: 1px;
    background-color: ${theme.colors.softgray};
    opacity: 0.6;
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const StyledCreatedAtText = styled.div`
    color: ${theme.colors.silver};
`;

const PostView = (props: IPostView) => {

    return (
        <StyledPostView>
            <PostInfo>
                <TextWithBackground>📁{props.folderName}</TextWithBackground>
                <StyledCreatedAtText>{props.createdAt}</StyledCreatedAtText>
            </PostInfo>
            <StyledTitle>{props.title}</StyledTitle>
            <StyledDivider />
            <QuillStyles>
                <ReactQuill
                    value={props.content}
                    readOnly={true}
                    theme="snow"
                    modules={{toolbar: false}}
                />
            </QuillStyles>
        </StyledPostView>
    )
}

export default PostView;