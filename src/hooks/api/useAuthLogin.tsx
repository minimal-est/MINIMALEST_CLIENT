import instance from "../../utils/instance.ts";
import {ILoginRequest} from "../../interfaces/dto/ILoginRequest.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import {ILoginSuccessResponse} from "../../interfaces/dto/ILoginSuccessResponse.ts";

const fetchAuthLogin = async (loginRequest: ILoginRequest) => {
    const response = await instance.post<IApiResponse<ILoginRequest>>('/api/auth/login', loginRequest);
    const accessToken = response.headers['minimalest-access-token'];
    localStorage.setItem('accessToken', accessToken);
    return response.data['data']!;
}

const useAuthLogin = () => {
    return useMutation<ILoginSuccessResponse, AxiosError, ILoginRequest>({
        mutationFn: (loginRequest: ILoginRequest) => fetchAuthLogin(loginRequest),
    });
}

export default useAuthLogin;