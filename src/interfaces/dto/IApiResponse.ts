export interface IApiResponse<T> {
    statusCode: number;
    status: string;
    message: string;
    data?: T;
    timestamp: string;
}