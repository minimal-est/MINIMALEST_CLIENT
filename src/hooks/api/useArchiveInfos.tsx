import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IArchiveInfos} from "../../interfaces/dto/IArchiveInfos.ts";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchArchiveInfos = async (email: string) => {
    const response = await instance.get<IApiResponse<IArchiveInfos>>(`/api/member/${email}/archive`);
    return response.data['data']!;
}

const useArchiveInfos = (email: string) => {
    return useQuery<IArchiveInfos, AxiosError>({
        queryKey: ['archiveInfos', email],
        queryFn: () => fetchArchiveInfos(email),
    })
}

export default useArchiveInfos;