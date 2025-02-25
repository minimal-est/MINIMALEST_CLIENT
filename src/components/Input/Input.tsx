import React from "react";
import {DefaultStyledInput} from "./Input.styles.ts";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    isTitle?: boolean;
}

const Input = (props: Props) => {

    const { isTitle, ...otherProps } = props;

    return <DefaultStyledInput
        isTitle={isTitle}
        {...otherProps}
    />
}

export default Input;