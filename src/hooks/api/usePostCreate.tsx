import {IPostCreateRequest} from "../../interfaces/dto/IPostCreateRequest.ts";
import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IPostCreateResponse} from "../../interfaces/dto/IPostCreateResponse.ts";

const fetchPostCreate = async (author: string, postData: IPostCreateRequest) => {
    const response = await instance.post<IApiResponse<IPostCreateResponse>>(`/api/archive/${author}/post`, postData);
    return response.data['data']!;
}

const usePostCreate = (author:string) => {
    return useMutation<IPostCreateResponse, AxiosError, IPostCreateRequest>({
        mutationFn: (postData: IPostCreateRequest) => fetchPostCreate(author, postData),
    });
}

export default usePostCreate;