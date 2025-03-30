import styled from "styled-components";
import {theme} from "../styles/theme.ts";

export const EditorStyles = styled.div`
    width: 900px;
    @media (max-width: 900px) {
        width: 100%;
    }
    
    /**/
    .w-md-editor {
        background-color: ${theme.colors.ghostwhite};
    }
    
    /* 프리뷰 디자인 */
    .wmde-markdown {
        background-color: inherit;
        font-size: 18px;
        line-height: 24px;
        h1, h2, h3, h4 {
            margin-top: 30px
        }
    }
    
    /* 툴바 디자인 */
    .w-md-editor-toolbar {
        background-color: inherit;
        padding: 1rem
    }
    
    .w-md-editor-toolbar li.active > button {
        color: ${theme.colors.sienna};
    }
    
    .w-md-editor-toolbar li > button {
        padding: 5px;
        border-radius: 10px;
        height: 100%;
        color: ${theme.colors.charcoal};
    }
    
    /* 편집창 폰트 크기 */
    .w-md-editor-text-pre > code,
    .w-md-editor-text-pre,
    .w-md-editor-text-input {
        font-size: 15px !important;
        line-height: 18px;
    }
`;