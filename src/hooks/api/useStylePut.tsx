import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {IStyleResponse} from "../../interfaces/dto/IStyleResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {IStyleRequest} from "../../interfaces/dto/IStyleRequest.ts";

const fetchStylePut = async (author: string, styleData: IStyleRequest) => {
    const response = await instance.put<IApiResponse<IStyleResponse>>(`/api/archive/${author}/style`, styleData);
    return response.data['data']!;
}

const useStylePut = (author: string) => {
    return useMutation<IStyleResponse, AxiosError, IStyleRequest>({
        mutationFn: (data) => fetchStylePut(author, data),
    });
}

export default useStylePut;