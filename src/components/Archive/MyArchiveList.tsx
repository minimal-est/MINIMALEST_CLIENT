import useArchiveInfos from "../../hooks/api/useArchiveInfos.tsx";
import MyArchive from "./MyArchive.tsx";
import styled from "styled-components";
import TextWithAccent from "../Text/TextWithAccent.tsx";

interface Props {
    email: string;
}

const ArchiveCountWrapper = styled.div`

`;

const MyArchiveListWrapper = styled.div`
    display: flex;
`;

const ArchiveInfosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ArchiveInfoContainerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const MyArchiveList = (props: Props) => {
    const {data: archiveInfos} = useArchiveInfos(props.email);

    return (
        <MyArchiveListWrapper>
            {archiveInfos &&
                <ArchiveInfoContainerWrapper>
                    <ArchiveCountWrapper>
                        <TextWithAccent>
                            현재 {archiveInfos.count}개의 아카이브가 존재합니다.
                        </TextWithAccent>
                    </ArchiveCountWrapper>
                    <ArchiveInfosWrapper>
                        {archiveInfos && archiveInfos.archiveInfoResponses.map(
                            (archiveInfo, key) => <MyArchive archiveInfo={archiveInfo} key={key} />
                        )}
                    </ArchiveInfosWrapper>
                </ArchiveInfoContainerWrapper>
            }
        </MyArchiveListWrapper>
    );
}

export default MyArchiveList;