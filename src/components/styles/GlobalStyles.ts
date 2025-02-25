import {createGlobalStyle} from "styled-components";
import {theme} from "./theme.ts";

const GlobalStyles = createGlobalStyle`
    body {
        font-family: 'Pretendard', sans-serif;
        margin: 0;
        padding: 0;
    }
    
    html {
        scroll-behavior: smooth;
    }
    
    a {
        color: ${theme.colors.softgray};
    }
    
    a::before {
        content: '🔗';
    }
`;

export default GlobalStyles;