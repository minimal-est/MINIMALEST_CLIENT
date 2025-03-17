import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IFolderCreateResponse} from "../../interfaces/dto/IFolderCreateResponse.ts";
import {IFolderCreateRequest} from "../../interfaces/dto/IFolderCreateRequest.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IValidationError} from "../../interfaces/dto/IValidationError.ts";

const fetchFolderCreate = async (data: IFolderCreateRequest, author: string) => {
    const response = await instance.post<IApiResponse<IFolderCreateResponse>>(`/api/archive/${author}/folder`, data);
    return response.data['data']!;
}

const useFolderCreate = (author: string) => {
    return useMutation<IFolderCreateResponse, AxiosError<IApiResponse<Array<IValidationError>>>, IFolderCreateRequest>({
        mutationFn: (data: IFolderCreateRequest) => fetchFolderCreate(data, author),
    });
}

export default useFolderCreate;