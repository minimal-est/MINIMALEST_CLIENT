import instance from "../../utils/instance.ts";
import {IArchiveCreateRequest} from "../../interfaces/dto/IArchiveCreateRequest.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IArchiveCreateResponse} from "../../interfaces/dto/IArchiveCreateResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";

const fetchArchiveCreate = async (data: IArchiveCreateRequest) => {
    const response = await instance.post<IApiResponse<IArchiveCreateResponse>>(`/api/archive`, data);
    return response.data['data']!;
}

const useArchiveCreate = () => {
    return useMutation<IArchiveCreateResponse, AxiosError<IApiResponse<Array<IValidationError>>>, IArchiveCreateRequest>({
        mutationFn: (data: IArchiveCreateRequest) => fetchArchiveCreate(data),
    });
}

export default useArchiveCreate;
