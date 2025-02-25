import useArchiveInfo from "../../hooks/api/useArchiveInfo.tsx";
import Header from "./Header.tsx";
import Spinner from "../common/Spinner.tsx";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

interface Props {
    author: string
}

const StyledHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    width: 100%;
    
    padding-top: 20px;
    padding-bottom: 20px;
    
    border-radius: 0 0 20px 20px;
    
    background-color: ${theme.colors.sienna};
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
            <Header author={data?.author ?? ''}
                    mainTitle={data?.mainTitle ?? ''}
                    subTitle={data?.subTitle ?? ''}
                    email={data?.email ?? ''}
            />
        </StyledHeaderContainer>
    )
}

export default HeaderContainer;