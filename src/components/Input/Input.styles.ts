import styled from "styled-components";
import {theme} from "../styles/theme.ts";

interface Props {
    isTitle?: boolean;
}

export const DefaultStyledInput = styled.input<Props>`
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 2px solid ${theme.colors.softgray};
    padding: 3px;
    margin: 0;
    box-sizing: border-box;
    background-color: transparent;
    
    font-family: inherit;
    font-size: ${(props) => (props.isTitle ? '40px' : '20px')};
    font-weight: bold;

    transition: all 0.2s ease-in-out;
    &:focus {
        border-bottom: 2px solid ${theme.colors.black};
    }
`;