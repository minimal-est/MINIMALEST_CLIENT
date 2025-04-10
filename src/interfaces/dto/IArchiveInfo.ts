import {IStyleDto} from "./IStyleDto.ts";

export interface IArchiveInfo {
    author: string;
    mainTitle: string;
    subTitle: string;
    email: string;
    profileImageUrl: string;
    archiveStyle: IStyleDto;
    postStyle: IStyleDto
};