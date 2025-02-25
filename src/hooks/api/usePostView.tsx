import {useQuery} from "@tanstack/react-query";
import {IPostView} from "../../interfaces/dto/IPostView.ts";
import {AxiosError} from "axios";
import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";

const fetchPostView = async (author: string, sequence: number) => {
    const response = await instance.get<IApiResponse<IPostView>>(`/api/archive/${author}/post/${sequence}`);
    return response.data['data']!;
}

const usePostView = (author: string, sequence: number) => {
    return useQuery<IPostView, AxiosError>({
        queryKey: ['postView', author, sequence],
        queryFn: () => fetchPostView(author, sequence),
        enabled: Boolean(author) && Boolean(sequence > 0),
        retry: 0,
    });
}

export default usePostView;