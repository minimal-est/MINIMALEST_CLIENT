import {StylesConfig} from "react-select";
import {theme} from "../styles/theme.ts";

export const customStyles: StylesConfig = {
    control: (provided, state) => ({
        ...provided,

        boxShadow: state.isFocused ? "0 0 5px rgba(0, 0, 0, 0.2)" : "none",
    }),

    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? `${theme.colors.sienna}` // 선택된 옵션 배경색
            : state.isFocused
                ? `${theme.colors.white}` // 마우스 hover 시 배경색
                : "white", // 기본 배경색
        color: state.isSelected ? "white" : "black", // 글자색
    })
}
