import {Quill} from "react-quill";
import {clearFormatSvg, codeSvg} from "../common/svg/icons.ts";

const iconColor = '#000';

export const initCustomIcons = () => {
    const icons = Quill.import('ui/icons') as Record<string, string>;
    icons['code'] =
        `<span style='color: ${iconColor}'>
            ${codeSvg}
        </span>`;

    icons['clean'] =
        `<span style='color: ${iconColor}'>
            ${clearFormatSvg}
        </span>`;

    icons['divider'] = `<span style="color: ${iconColor}">|</span>`;
}