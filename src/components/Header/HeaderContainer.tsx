import useArchiveInfo from "../../hooks/api/useArchiveInfo.tsx";
import Header from "./Header.tsx";
import Spinner from "../common/Spinner.tsx";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";

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
`;

const HeaderWrapper = styled.div`
    color: inherit;
    text-decoration: none;
`;

const LogoWrapper = styled.div`
    position: absolute;
    left: 25px;
    top: 25px;
`;

const Logo = styled.img`

`;

const HeaderContainer = (props: Props) => {
    const navigate = useNavigate();
    const {data, isLoading, isError} = useArchiveInfo(props.author);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        navigate('/error/404');
    }

    return (
        <StyledHeaderContainer>
            <LogoWrapper>
                <div>
                    <Link to={'/'}>
                        <Logo src='/assets/M.png'/>
                    </Link>
                </div>
            </LogoWrapper>
            <HeaderWrapper>
                <Link to={`/archive/${props.author}`} style={{ textDecoration: 'none' }}>
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