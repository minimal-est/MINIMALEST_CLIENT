import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IMemberFindResponse} from "../../interfaces/dto/IMemberFindResponse.ts";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchFindAndValidateMember = async (email: string, author: string) => {
    const response = await instance.get<IApiResponse<IMemberFindResponse>>(`/api/member/${email}/archive/${author}`);
    return response.data['data']!;
}

const useFindAndValidateMember = (email: string, author: string) => {
    return useQuery<IMemberFindResponse, AxiosError>({
        queryKey: ['findAndValidateMember', email, author],
        queryFn: () => fetchFindAndValidateMember(email, author),
        retry: 0
    });
}

export default useFindAndValidateMember;