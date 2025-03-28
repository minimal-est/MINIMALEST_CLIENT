import {IArchiveInfo} from "../../interfaces/dto/IArchiveInfo.ts";
import styled from "styled-components";
import {Link} from "react-router-dom";

interface Props {
    archiveInfo: IArchiveInfo
}

const MyArchiveWrapper = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid;
    padding-left: 10px;
    word-break: break-all;
`;

const AuthorWrapper = styled.div`
    font-size: 20px;
`;

const MainTitleWrapper = styled.div`
    font-size: 2.5rem;
`;

const SubTitleWrapper = styled.div`
    font-size: 1rem;
`;

const LinkWrapper = styled.div`
    
`;

const MyArchive = (props: Props) => {
    return (
        <MyArchiveWrapper>
            <AuthorWrapper>
                @ {props.archiveInfo.author}
            </AuthorWrapper>
            <TitleWrapper>
                <MainTitleWrapper>
                    {props.archiveInfo.mainTitle}
                </MainTitleWrapper>
                <SubTitleWrapper>
                    {props.archiveInfo.subTitle}
                </SubTitleWrapper>
            </TitleWrapper>
            <LinkWrapper>
                <Link to={`/archive/${props.archiveInfo.author}`}>
                    {'들어가기'}
                </Link>
            </LinkWrapper>
        </MyArchiveWrapper>
    )
}

export default MyArchive;