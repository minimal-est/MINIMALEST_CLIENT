import styled from "styled-components";
import { theme } from "../styles/theme.ts";
import React from "react";

// Props 타입 정의
type Props = {
    color?: string;
    fontSize?: string;
    padding?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
};

// 스타일링된 컴포넌트
export const StyledTextWithBackground = styled.div<Props>`
    display: inline-block;
    background-color: ${(props) => props.backgroundColor || theme.colors.lightgray};
    color: ${(props) => props.color || theme.colors.charcoal}; 
    font-size: ${(props) => props.fontSize || '16px'};
    border-radius: 5px;
    padding: ${(props) => props.padding || '3px'};
`;

const TextWithBackground = (props: Props) => {
    return (
        <StyledTextWithBackground
            color={props.color}
            fontSize={props.fontSize}
            padding={props.padding}
            backgroundColor={props.backgroundColor}
        >
        {props.children}
        </StyledTextWithBackground>
);
};

export default TextWithBackground;
