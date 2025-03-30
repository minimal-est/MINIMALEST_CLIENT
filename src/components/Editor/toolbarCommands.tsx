import {
    bold, code, codeBlock,
    codeEdit,
    codeLive,
    codePreview, ExecuteState,
    fullscreen, hr,
    ICommand, italic, link, quote, strikethrough, TextAreaTextApi,
    title1,
    title2,
    title3,
    title4
} from "@uiw/react-md-editor";
import {BiCodeAlt, BiExpand, BiMinus,} from "react-icons/bi";
import {
    BsEyeFill,
    BsFillPencilFill, BsQuote,
    BsTypeBold,
    BsTypeH1,
    BsTypeH2,
    BsTypeH3,
    BsTypeH4, BsTypeItalic, BsTypeStrikethrough,
} from "react-icons/bs";
import {FaImage} from "react-icons/fa6";
import {PiHighlighterFill, PiLinkBold, PiSquareSplitHorizontalFill} from "react-icons/pi";
import {handleImage} from "./toolbarHandler.ts";

const defaultIconSize = 20;

export const fullscreenCommand: ICommand = {
    ...fullscreen,
    icon: (<BiExpand size={defaultIconSize}/>)
}

export const editCommand: ICommand = {
    ...codeEdit,
    icon: (<BsFillPencilFill size={defaultIconSize}/>)
}

export const previewCommand: ICommand = {
    ...codePreview,
    icon: (<BsEyeFill size={defaultIconSize}/>)
}

export const liveCommand: ICommand = {
    ...codeLive,
    icon: (<PiSquareSplitHorizontalFill size={defaultIconSize}/>)
}

export const imageUploadCommand: ICommand = {
    name: 'image',
    keyCommand: 'image',
    buttonProps: {"aria-label": "이미지 삽입"},
    icon: (<FaImage size={defaultIconSize}/>),
    execute: (_state: ExecuteState, api: TextAreaTextApi) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];

            // 업로드 시작
            api.textArea.disabled = true;
            const imageUrl = await handleImage(file!);
            api.textArea.disabled = false;

            if (!imageUrl || imageUrl === '') return;

            api.replaceSelection(`![이미지 설명](${imageUrl})`);
        }
        input.click();
    }
}

export const h1Command: ICommand = {
    ...title1,
    icon: (<BsTypeH1 size={defaultIconSize}/>)
}

export const h2Command: ICommand = {
    ...title2,
    icon: (<BsTypeH2 size={defaultIconSize}/>)
}

export const h3Command: ICommand = {
    ...title3,
    icon: (<BsTypeH3 size={defaultIconSize}/>)
}

export const h4Command: ICommand = {
    ...title4,
    icon: (<BsTypeH4 size={defaultIconSize}/>)
}

export const boldCommand: ICommand = {
    ...bold,
    icon: (<BsTypeBold size={defaultIconSize}/>)
}

export const italicCommand: ICommand = {
    ...italic,
    icon: (<BsTypeItalic size={defaultIconSize}/>)
}

export const strikethroughCommand: ICommand = {
    ...strikethrough,
    icon: (<BsTypeStrikethrough size={defaultIconSize}/>)
}

export const hrCommand: ICommand = {
    ...hr,
    icon: (<BiMinus size={defaultIconSize}/>)
}

export const quoteCommand: ICommand = {
    ...quote,
    icon: (<BsQuote size={defaultIconSize}/>
    )
}

export const codeBlockCommand: ICommand = {
    ...codeBlock,
    icon: (<BiCodeAlt size={defaultIconSize}/>)
}

export const linkCommand: ICommand = {
    ...link,
    icon: (<PiLinkBold size={defaultIconSize}/>)
}

export const highlightCommand: ICommand = {
    ...code,
    icon: (<PiHighlighterFill size={defaultIconSize}/>)
}