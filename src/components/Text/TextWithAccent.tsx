import React from "react";
import styled from "styled-components";
import {theme} from "../styles/theme.ts";

const StyledTextWithAccent = styled.span`
    position: relative;
    padding-left: 12px;
    
    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background-color: ${theme.colors.sienna};
        border-radius: 2px;
    }
`;

const TextWithAccent = ({children}: {children: React.ReactNode}) => {
    return (
        <StyledTextWithAccent>
            {children}
        </StyledTextWithAccent>
    )
}

export default TextWithAccent;