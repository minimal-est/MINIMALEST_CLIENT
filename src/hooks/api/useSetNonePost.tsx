import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchSetNonePost = async (author: string, sequence: number) => {
    const response = await instance.put<IApiResponse<string>>(`/api/archive/${author}/post/${sequence}/role/NONE`);
    return response.data['data']!
};

const useSetNonePost = () => {
    return useMutation<string, AxiosError, {author: string, sequence: number}>({
        mutationKey: ['setNonePost'],
        mutationFn: ({author, sequence}) => fetchSetNonePost(author, sequence),
    });
}

export default useSetNonePost;