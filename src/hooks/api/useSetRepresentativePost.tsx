import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchSetRepresentativePost = async (author: string, sequence: number) => {
    const response = await instance.put<IApiResponse<string>>(`/api/archive/${author}/post/${sequence}/role/REPRESENTATIVE`);
    return response.data['data']!
};

const useSetRepresentativePost = () => {
    return useMutation<string, AxiosError, {author: string, sequence: number}>({
        mutationKey: ['setRepresentationPost'],
        mutationFn: ({author, sequence}) => fetchSetRepresentativePost(author, sequence),
    });
}

export default useSetRepresentativePost;