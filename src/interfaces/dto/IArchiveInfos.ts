import {IArchiveInfo} from "./IArchiveInfo.ts";

export interface IArchiveInfos {
    count: number;
    isEmpty: boolean;
    archiveInfoResponses: Array<IArchiveInfo>;
}