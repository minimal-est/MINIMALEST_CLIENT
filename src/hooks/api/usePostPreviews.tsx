import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IPostPreview} from "../../interfaces/dto/IPostPreview.ts";
import {ISlice} from "../../interfaces/dto/ISlice.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchPostPreviews = async (author: string, page: unknown, size: number) => {
    const response = await instance.get<IApiResponse<ISlice<IPostPreview>>>(
        `/api/archive/${author}/post/preview?page=${page}&size=${size}`
    );
    return response.data['data']!;
}

const usePostPreviews = (author: string) => {
    return useInfiniteQuery<ISlice<IPostPreview>, AxiosError>({
        queryKey: ['slicePostPreviews', author],
        queryFn: ({pageParam}) => fetchPostPreviews(author, pageParam, 5),
        getNextPageParam: (lastPage) => {
            const typedLastPage = lastPage as ISlice<IPostPreview>;

            if (typedLastPage.last) {
                return undefined;
            }

            return typedLastPage.pageable.pageNumber + 1;
        },
        initialPageParam: 0,
    });
};

export default usePostPreviews;