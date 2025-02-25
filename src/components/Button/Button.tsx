import React from "react";
import {DefaultStyledButton} from "./Button.styles.ts";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    color?: 'black' | 'white';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean
}

const Button = (props: Props) => {
    return (
        <DefaultStyledButton
            onClick={props.onClick}
            color={props.color}
            size={props.size}
            disabled={props.disabled}
        >
            {props.children}
        </DefaultStyledButton>
    )
}

export default Button;