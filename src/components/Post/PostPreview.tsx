import {IPostPreview} from "../../interfaces/dto/IPostPreview.ts";
import styled from "styled-components";
import Thumbnail from "./Thumbnail.tsx";
import {theme} from "../styles/theme.ts";
import TextWithBackground from "../Text/TextWithBackground.tsx";
import {useNavigate} from "react-router-dom";

const StyledPostPreview = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;

    background-color: ${theme.colors.ghostwhite};
    border-radius: 8px;
    border-left: 10px solid ${theme.colors.sienna};
    padding: 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        align-items: center;
    }
    
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        cursor: pointer;
        transform: translateY(-5px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
`;

const PostThumbnail = styled.div`
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 10px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const PostWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    margin-left: 20px;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    word-break: break-word;
    overflow: hidden;
    gap: 10px;
    
    padding: 10px;

    @media (max-width: 768px) {
        align-items: center;
    }
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    
    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const StyledTitleText = styled.div`
    font-weight: bold;
    font-size: 27px;
    color: ${theme.colors.charcoal};
`;

const StyledContentText = styled.div`
    font-size: 16px;
    color: ${theme.colors.softgray};
`;

const StyledCreatedAtText = styled.div`
    font-size: 15px;
    color: ${theme.colors.silver};
`;

const StyledFolderNameText = styled.div`
    font-size: 14px;
`;

const PostPreview = (props: IPostPreview) => {
    const navigate = useNavigate();

    return (
        <StyledPostPreview onClick={() => navigate(`/${props.author}/${props.sequence}`)}>
            {props.thumbnailUrl && (
                <PostThumbnail>
                    <Thumbnail src={props.thumbnailUrl}/>
                </PostThumbnail>
            )}
            <PostWrap>
                <PostInfo>
                    <TextWithBackground>
                        <StyledFolderNameText>📁{props.folderName}</StyledFolderNameText>
                    </TextWithBackground>
                    <StyledCreatedAtText>{props.createdAt}</StyledCreatedAtText>
                </PostInfo>
                <PostContent>
                    <StyledTitleText>{props.title}</StyledTitleText>
                    <StyledContentText>{props.summary}</StyledContentText>
                </PostContent>
            </PostWrap>
        </StyledPostPreview>
    )
}

export default PostPreview;