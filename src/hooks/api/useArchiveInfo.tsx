import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IArchiveInfo} from "../../interfaces/dto/IArchiveInfo.ts";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchArchiveInfo = async (author: string) => {
    const response = await instance.get<IApiResponse<IArchiveInfo>>(`/api/archive/${author}`);
    return response.data['data']!;
}

const useArchiveInfo = (author: string) => {
    return useQuery<IArchiveInfo, AxiosError>({
        queryKey: ['archiveInfo', author],
        queryFn: () => fetchArchiveInfo(author),
        enabled: !!author,
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        retry: 0,
    });
};

export default useArchiveInfo;