import {useQuery} from "@tanstack/react-query";
import {IPostView} from "../../interfaces/dto/IPostView.ts";
import {AxiosError} from "axios";
import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {ISlice} from "../../interfaces/dto/ISlice.ts";

const fetchPostView = async (author: string, role: string) => {
    const response = await instance.get<IApiResponse<ISlice<IPostView>>>(`/api/archive/${author}/post/role/${role}`);
    return response.data['data']!;
}

const usePostViews = (author: string, role: string) => {
    return useQuery<ISlice<IPostView>, AxiosError>({
        queryKey: ['postViewWithRole', author, role],
        queryFn: () => fetchPostView(author, role),
        enabled: Boolean(author) && Boolean(role),
        retry: 0,
    });
}

export default usePostViews;