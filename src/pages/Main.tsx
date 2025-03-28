import MainLayout from "../layouts/MainLayout.tsx";
import {useEffect, useState} from "react";
import validateFromEmailToken from "../utils/validateFromEmailToken.ts";
import Spinner from "../components/common/Spinner.tsx";
import {Link} from "react-router-dom";
import {FlexColumnWrapper} from "../components/Layout/Flex.styles.ts";
import styled from "styled-components";
import MyArchiveList from "../components/Archive/MyArchiveList.tsx";

const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HelpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const HelpLinkWrapper = styled.div`
    font-size: 1.5rem;
`;

const ArchiveListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    gap: 20px;
`;

const ArchiveInfosWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Main = () => {
    const [isMemberLoading, setIsMemberLoading] = useState<boolean>(true);
    const [isMember, setIsMember] = useState<boolean>(false);
    const [emailIfMember, setEmailIfMember] = useState<string | undefined>("");

    const updateIsMember = async () => {
        const memberValidation = await validateFromEmailToken();
        setIsMember(memberValidation.isValid);
        setEmailIfMember(memberValidation.email);
        setIsMemberLoading(false);
    }

    useEffect(() => {
        updateIsMember();
    }, []);

    return (
        <MainLayout>
            <MainWrapper>
                {isMemberLoading && <Spinner />}

                {!isMemberLoading && isMember &&
                    // 회원일 때 렌더링할 컴포넌트
                    <ArchiveListWrapper>
                        <ArchiveInfosWrapper>
                            {emailIfMember && <MyArchiveList email={emailIfMember} />}
                        </ArchiveInfosWrapper>
                        <HelpLinkWrapper>
                            <HelpLinkWrapper>
                                <Link to={'/create'}>새로운 <strong>아카이브</strong> 생성하기 {'>'}</Link>
                            </HelpLinkWrapper>
                        </HelpLinkWrapper>
                    </ArchiveListWrapper>
                }

                {!isMemberLoading && !isMember &&
                    // 회원이 아닐 때 렌더링할 컴포넌트
                    <FlexColumnWrapper>
                        <HelpWrapper>
                            <HelpLinkWrapper>
                                <Link to={'/login'}>5초만에 로그인 | 가입하고 아카이브를 만들어보세요! ✍🏻 {'>'}</Link>
                            </HelpLinkWrapper>
                            <HelpLinkWrapper>
                                <Link to={'/archive-network'}>다른 작가들의 아카이브 둘러보기 🔎 {'>'}</Link>
                            </HelpLinkWrapper>
                        </HelpWrapper>
                    </FlexColumnWrapper>
                }
            </MainWrapper>
        </MainLayout>
    )
}

export default Main;
