import {useEffect, useState} from "react";
import { IStyleRequest } from "../../interfaces/dto/IStyleRequest.ts";
import useStylePut from "../../hooks/api/useStylePut.tsx";
import useArchiveInfo from "../../hooks/api/useArchiveInfo.tsx";
import {toast} from "react-toastify";
import Button from "../Button/Button.tsx";
import {BiColor} from "react-icons/bi";

interface Props {
    author: string;
}

const StyleJsonEditor = ({ author }: Props) => {
    const [jsonText, setJsonText] = useState<string>("");
    const { data: archiveInfo } = useArchiveInfo(author);
    const { mutate: putStyle, isPending } = useStylePut(author);

    useEffect(() => {
        if (archiveInfo) {
            const styleRequest = {
                archiveStyle: { styles: archiveInfo.archiveStyle.styles },
            };
            setJsonText(JSON.stringify(styleRequest, null, 2));
        }
    }, [archiveInfo]);

    const handleSubmit = () => {
        try {
            const parsed: IStyleRequest = JSON.parse(jsonText);
            putStyle(parsed, {
                onSuccess: () => {
                    toast.success('스타일 저장 완료! 새로고침 시 반영됩니다.', {
                        autoClose: 3000,
                    })
                },
                onError: (err) => {
                    if (err.status === 500) {
                        toast.error('형식을 올바르게 지켜주세요!', {
                            autoClose: 3000,
                        })
                    }
                }
            });
        } catch (e) {
            toast.error('JSON 형식을 지켜주세요!');
            console.error(e);
        }
    };

    return (
        <div>
            <h2>스타일 JSON 에디터 Beta</h2>
            <h3>
                <a
                    href={'https://www.google.com/search?q=%EC%83%89%EC%83%81%ED%94%BC%EC%BB%A4'}
                    rel="noopener noreferrer"
                    target="_blank"
                ><BiColor /> 색상표</a>
            </h3>
            <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={20}
                cols={60}
                style={{ fontFamily: "monospace", whiteSpace: "pre" }}
            />
            <br />
            <Button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "저장 중..." : "스타일 저장"}
            </Button>
        </div>
    );
};

export default StyleJsonEditor;
