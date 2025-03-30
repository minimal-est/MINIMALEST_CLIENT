import MDEditor, {divider, ICommand} from "@uiw/react-md-editor";
import React from "react";
import {
    boldCommand, codeBlockCommand,
    editCommand,
    fullscreenCommand,
    h1Command, h2Command, h3Command, h4Command, highlightCommand, hrCommand,
    imageUploadCommand, italicCommand, linkCommand,
    liveCommand,
    previewCommand, quoteCommand, strikethroughCommand,
} from "./toolbarCommands.tsx";
import rehypeSanitize from "rehype-sanitize";
import {EditorStyles} from "./editorStyles.ts";
import {handlePasteUpload} from "./toolbarHandler.ts";

interface Props {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}

const MarkdownEditor = (props: Props) => {

    const commands: ICommand[] = [
        h1Command,
        h2Command,
        h3Command,
        h4Command,
        divider,
        boldCommand,
        italicCommand,
        strikethroughCommand,
        highlightCommand,
        divider,
        hrCommand,
        quoteCommand,
        codeBlockCommand,
        divider,
        linkCommand,
        imageUploadCommand,
    ]

    const extraCommands: ICommand[] = [
        liveCommand,
        editCommand,
        previewCommand,
        divider,
        fullscreenCommand,
    ]

    return (
        <EditorStyles data-color-mode="light">
            <MDEditor
                id='editor'
                value={props.value}
                onChange={(v) => props.onChange(v!)}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                }}
                commands={commands}
                extraCommands={extraCommands}
                textareaProps={{
                    placeholder:
                        '이곳에 작성하세요. ✍🏻' +
                        '\n *포스트의 첫 번째 이미지가 썸네일로 선정됩니다.' +
                        '\n *에디터 오른쪽 위의 \'전체화면\'으로 더욱 편리하게 작성해보세요.' +
                        '\n *이미지를 \'복사 붙여넣기\' or \'드래그 드랍\' 해보세요.'
                }}
                visibleDragbar={false}
                height={800}
                onPaste={(e) => handlePasteUpload(e.clipboardData, props.onChange)}
                onDrop={(e) => {
                    e.preventDefault();
                    handlePasteUpload(e.dataTransfer, props.onChange)}
                }
            />
        </EditorStyles>
    )
}

export default MarkdownEditor;