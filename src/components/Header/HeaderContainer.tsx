import useArchiveInfo from "../../hooks/api/useArchiveInfo.tsx";
import Header from "./Header.tsx";
import Spinner from "../common/Spinner.tsx";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";
import {Link} from "react-router-dom";

interface Props {
    author: string
}

const StyledHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    width: 100%;
    
    padding-top: 20px;
    padding-bottom: 20px;
    
    background-color: ${theme.colors.sienna};
`;

const HeaderWrapper = styled.div`
    color: inherit;
    text-decoration: none;
`;

const LogoWrapper = styled.div`
    position: absolute;
    left: 25px;
`;

const Logo = styled.img`

`;

const HeaderContainer = (props: Props) => {

    const {data, isLoading, isError} = useArchiveInfo(props.author);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <p>😢일시적인 오류로 아카이브를 불러오는 데 실패했습니다.. 죄송합니다!</p>;
    }

    return (
        <StyledHeaderContainer>
            <LogoWrapper>
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                    <Logo src='/assets/M.png'/>
                </Link>
            </LogoWrapper>
            <HeaderWrapper>
                <Link to={`/${props.author}`} style={{ textDecoration: 'none' }}>
                    <Header author={data?.author ?? ''}
                            mainTitle={data?.mainTitle ?? ''}
                            subTitle={data?.subTitle ?? ''}
                            email={data?.email ?? ''}
                            profileImageUrl={data?.profileImageUrl ?? ''}
                    />
                </Link>
            </HeaderWrapper>
        </StyledHeaderContainer>
    )
}

export default HeaderContainer;