import HeaderContainer from "../components/Header/HeaderContainer.tsx";
import React, {useEffect} from "react";
import FooterContainer from "../components/Footer/FooterContainer.tsx";
import styled from "styled-components";
import {useStyle} from "../contexts/StyleContext.tsx";
import useArchiveInfo from "../hooks/api/useArchiveInfo.tsx";
import {IArchiveStyle} from "../interfaces/IArchiveStyle.ts";

interface Props {
    author: string;
    children: React.ReactNode;
}

const StyledArchiveLayout = styled.div<IArchiveStyle>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    
    min-height: 100vh;
    
    background-color: ${({backgroundColor}) => backgroundColor || 'inherit'};
    color: ${({fontColor}) => fontColor || 'inherit'};
`;

const ArchiveLayout = (props: Props) => {
    const {archiveStyle, setArchiveStyle} = useStyle();
    const {data: archiveInfo, isLoading: isLoadingArchiveInfo} = useArchiveInfo(props.author);

    useEffect(() => {
        if (!isLoadingArchiveInfo && archiveInfo) {
            setArchiveStyle(archiveInfo.archiveStyle.styles);
        }
    }, [archiveInfo]);

    return (
        <StyledArchiveLayout
            backgroundColor={archiveStyle['backgroundColor']}
            fontColor={archiveStyle['fontColor']}
        >
            <HeaderContainer author={props.author} />
                {props.children}
            <FooterContainer />
        </StyledArchiveLayout>
    );
}

export default ArchiveLayout;