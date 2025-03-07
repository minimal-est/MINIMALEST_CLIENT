import React from "react";
import {IFolderView} from "./dto/IFolderView.ts";

export interface IPostCreateProps {
    author: string;
    titleValue: string;
    onChangeTitleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    postValue: string;
    onChangePostValue: React.Dispatch<React.SetStateAction<string>>;

    folders: Array<IFolderView>;
    folder: {value: number, label: string};
    onChangeFolder: React.Dispatch<React.SetStateAction<{value: number, label: string}>>;

    create: () => void;
    saveDraft: () => void;
    isModifyMode: boolean;
}