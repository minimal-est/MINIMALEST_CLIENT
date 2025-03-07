import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchPostDelete = async (author: string, sequence: number) => {
    const response = await instance.delete<IApiResponse<string>>(`/api/archive/${author}/post/${sequence}`);
    return response.data['data']!;
}

const usePostDelete = () => {
    return useMutation<string, AxiosError, {author: string, sequence: number}>({
        mutationKey: ['postDelete'],
        mutationFn: ({author, sequence}) => fetchPostDelete(author, sequence),
    })
}

export default usePostDelete;