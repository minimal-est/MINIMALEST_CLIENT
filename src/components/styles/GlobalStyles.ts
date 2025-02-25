import {createGlobalStyle} from "styled-components";
import {theme} from "./theme.ts";

const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        padding: 0;
    }
    
    a {
        color: ${theme.colors.softgray};
    }
`;

export default GlobalStyles;