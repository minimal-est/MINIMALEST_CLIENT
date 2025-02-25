import styled from "styled-components";
import {theme} from "../styles/theme.ts";

interface Props {
    color?: 'black' | 'white'
    size?: 'small' | 'medium' | 'large';
}

export const DefaultStyledButton = styled.button<Props>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: ${(props) => (
            props.size === 'small' ? '6px 12px' : props.size === 'large' ? '12px 24px' : '8px 16px'
    )};
    
    font-family: inherit;

    font-size: ${(props) => (
            props.size === 'small' ? '14px' : props.size === 'large' ? '18px' : '16px'
    )};
    
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    
    background-color: ${(props) => (
        props.color === 'black' ? theme.colors.black : theme.colors.lightgray
    )};
    
    color: ${(props) => (
        props.disabled ? theme.colors.softgray :
        props.color === 'black' ? theme.colors.white : theme.colors.black
    )};

    transition: all 0.2s ease-in-out;
    &:hover {
        opacity: ${(props) => (props.disabled ? '1' : '0.8')}
    }
`;