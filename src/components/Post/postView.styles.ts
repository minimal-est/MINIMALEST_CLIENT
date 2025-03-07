import styled from "styled-components";
import {theme} from "../styles/theme.ts";

export const StyledTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: ${theme.colors.charcoal};
`;

export const StyledDivider = styled.hr`
    width: 100%;
    margin: 20px 0;
    border: none;
    height: 1px;
    background-color: ${theme.colors.softgray};
    opacity: 0.6;
`;