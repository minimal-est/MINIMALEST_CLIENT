import React, {forwardRef} from "react";
import {DefaultStyledInput} from "./Input.styles.ts";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    isTitle?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(({isTitle, ...otherProps}, ref) => {
    return <DefaultStyledInput isTitle={isTitle}
                               ref={ref}
                               {...otherProps} />;
})

export default Input;