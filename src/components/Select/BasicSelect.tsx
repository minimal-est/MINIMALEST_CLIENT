import Select from "react-select";
import {customStyles} from "./select.styles.ts";
import React from "react";

interface Props {
    value: {value: number; label: string};
    onChange: React.Dispatch<React.SetStateAction<{value: number, label: string}>>;
    options: {value: number; label: string}[];
    placeholder: string
}

const BasicSelect = (props: Props) => {
    const handleSelectionChange = (newValue: unknown) => {
        if (newValue) {
            props.onChange(newValue as {value: number, label: string});
        }
    };

    return (
        <Select
            value={props.value}
            onChange={handleSelectionChange}
            options={props.options}
            defaultValue={props.options[0]}
            styles={customStyles}
            placeholder={props.placeholder}
        />
    )
}

export default BasicSelect;