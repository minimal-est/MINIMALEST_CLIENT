import {IPostCreateRequest} from "../../interfaces/dto/IPostCreateRequest.ts";
import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IPostCreateResponse} from "../../interfaces/dto/IPostCreateResponse.ts";

const fetchPostModify = async (author: string, sequence: number, data: IPostCreateRequest) => {
    const response = await instance.put<IApiResponse<IPostCreateResponse>>(`/api/archive/${author}/post/${sequence}`, data);
    return response.data['data']!;
}

const usePostModify = (author: string, sequence: number) => {
    return useMutation<IPostCreateResponse, AxiosError, IPostCreateRequest>({
        mutationFn: (data: IPostCreateRequest) => fetchPostModify(author, sequence, data),
    });
}

export default usePostModify;