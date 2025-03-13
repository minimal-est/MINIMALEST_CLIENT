import React from "react";
import {DefaultStyledButton} from "./Button.styles.ts";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    color?: 'black' | 'white' | 'red';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button = (props: Props) => {
    return (
        <DefaultStyledButton
            onClick={props.onClick}
            color={props.color}
            size={props.size}
            disabled={props.disabled}
            type={props.type || 'button'}
        >
            {props.children}
        </DefaultStyledButton>
    )
}

export default Button;