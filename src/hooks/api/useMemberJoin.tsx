import instance from "../../utils/instance.ts";
import {IMemberJoinRequest} from "../../interfaces/dto/IMemberJoinRequest.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IMemberJoinResponse} from "../../interfaces/dto/IMemberJoinResponse.tsx";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";



const fetchMemberJoin = async (joinData: IMemberJoinRequest) => {
    const response = await instance.post<IApiResponse<IMemberJoinResponse>>(`/api/member`, joinData);
    return response.data['data']!;
}

const useMemberJoin = () => {
    return useMutation<IMemberJoinResponse, AxiosError<IApiResponse<Array<IValidationError>>>, IMemberJoinRequest>({
        mutationFn: (joinData: IMemberJoinRequest) => fetchMemberJoin(joinData),
    })
}

export default useMemberJoin;