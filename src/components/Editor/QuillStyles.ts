import styled from "styled-components";
import {theme} from "../styles/theme.ts";

export const QuillStyles = styled.div`
    .ql-container {
        border: none;
        width: 900px;

        @media (max-width: 900px) {
            width: 100%;
        }
    }
    
    .ql-editor {
        font-size: 18px;
    }
    
    .ql-editor img {
        max-width: 100%;
        height: auto;
    }
    
    .ql-toolbar {
        display: flex;
        justify-content: center;
        border: none;
        
        position: sticky;
        top: 0;
        border-radius: 0 0 10px 10px;
        z-index: 1;
        
        background-color: ${theme.colors.ghostwhite};
    }
`;