import {IAuthType} from "./IAuthType.ts";

export interface ILoginRequest {
    email: string;
    rawPassword: string;
    authType: IAuthType;
}