import {IPostView} from "../../interfaces/dto/IPostView.ts";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import TextWithBackground from "../Text/TextWithBackground.tsx";
import Button from "../Button/Button.tsx";
import {StyledDivider, StyledTitle} from "./postView.styles.ts";
import PostHit from "./PostHit.tsx";
import MarkdownPreview from "../Editor/MarkdownPreview.tsx";

const StyledPostView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${theme.colors.ghostwhite};
    padding: 20px;
    border-radius: 10px;
    max-width: 900px;
    
    @media (max-width: 900px) {
        width: 95%;
    }
`;

const PostInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const PostStatistic = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledCreatedAtText = styled.div`
    color: ${theme.colors.silver};
`;

const OnlyLogined = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
`;

interface Props extends IPostView {
    isAuthenticated: boolean;
    onSetRepresentative?: () => void;
    onUnsetRepresentative?: () => void;
    onModify?: () => void;
    onDelete?: () => void;
}

const PostView = (props: Props) => {

    return (
        <StyledPostView>
            {props.isAuthenticated && (
                <OnlyLogined>
                    {props.postRole === 'REPRESENTATIVE' && (
                        <Button size="small" onClick={props.onUnsetRepresentative}>
                            대표 포스트 해제
                        </Button>
                    )}
                    {props.postRole === 'NONE' && (
                        <Button size="small" color="black" onClick={props.onSetRepresentative}>
                            ✨대표 포스트로 설정
                        </Button>
                    )}
                    <Button size="small" onClick={props.onModify}>
                        수정
                    </Button>
                    <Button size="small" onClick={props.onDelete} color='red'>
                        삭제
                    </Button>
                </OnlyLogined>
            )}
            <PostInfo>
                <TextWithBackground>📁{props.folderName}</TextWithBackground>
                <StyledCreatedAtText>
                    {props.createdAt} {props.isModified && '(수정됨)'}
                </StyledCreatedAtText>
            </PostInfo>
            <PostStatistic>
                <PostHit hitCount={props.hitCount} />
            </PostStatistic>
            <StyledTitle>{props.title}</StyledTitle>
            <StyledDivider />
            <MarkdownPreview content={props.content} />
        </StyledPostView>
    )
}

export default PostView;