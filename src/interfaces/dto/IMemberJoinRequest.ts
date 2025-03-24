import {IAuthType} from "./IAuthType.ts";

export interface IMemberJoinRequest {
    username: string;

    rawPassword: string;

    email: string;

    profileImageUrl: string;

    authType: IAuthType;
}