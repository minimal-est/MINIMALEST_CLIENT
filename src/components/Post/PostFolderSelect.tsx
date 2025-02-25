import React from "react";
import BasicSelect from "../Select/BasicSelect.tsx";
import {IFolderView} from "../../interfaces/dto/IFolderView.ts";

interface Props {
    folders: Array<IFolderView>;
    author: string;
    value: {value: number, label: string};
    onChange: React.Dispatch<React.SetStateAction<{value: number, label: string}>>;
}

const PostFolderSelect = (props: Props) => {

    const options = (props.folders ?? []).map((folder) => ({value: folder.id, label: folder.name}));

    return (
        <BasicSelect
            value={props.value}
            onChange={props.onChange}
            options={options}
            placeholder='폴더를 선택해주세요.'
        />
    )
}

export default PostFolderSelect;