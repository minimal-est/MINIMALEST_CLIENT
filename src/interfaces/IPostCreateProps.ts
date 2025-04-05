import React from "react";
import {IFolderView} from "./dto/IFolderView.ts";

export interface IPostCreateProps {
    author: string;
    titleValue: string;
    postValue: string;
    thumbnailUrl: string;
    folder: {value: number, label: string};
    folders: Array<IFolderView>;
    isModifyMode: boolean;

    onChangeTitleValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangePostValue: React.Dispatch<React.SetStateAction<string>>;
    onChangeFolder: React.Dispatch<React.SetStateAction<{value: number, label: string}>>;
    onChangeThumbnailUrl: React.Dispatch<React.SetStateAction<string>>

    create: () => void;
    saveDraft: () => void;
}