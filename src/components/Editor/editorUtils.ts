const insertToTextArea = (intsertString: string) => {
    const textarea = document.getElementById('editor')!.querySelector('textarea');
    if (!textarea) {
        return null;
    }

    let markdownValue = textarea.value;
    const len = markdownValue.length;
    const pos = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const front = markdownValue.slice(0, pos);
    const back = markdownValue.slice(pos, len);

    markdownValue = front + intsertString + back;

    textarea.value = markdownValue;
    textarea.selectionEnd = end + intsertString.length;

    return markdownValue;
};

export default insertToTextArea;