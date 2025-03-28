import fetchEmailFromToken from "./fetchEmailFromToken.ts";
import {IMemberFindResponse} from "../interfaces/dto/IMemberFindResponse.ts";
import instance from "./instance.ts";
import {IApiResponse} from "../interfaces/dto/IApiResponse.ts";

const validateFromEmailToken = async (): Promise<{ isValid: boolean, email?: string }> => {
    const email = await fetchEmailFromToken();
    if (!email) return { isValid: false };

    try {
        const response = await instance.get<IApiResponse<IMemberFindResponse>>(`/api/member/${email}`);
        const data = response.data['data'];

        if (data && data.email === email) {
            return { isValid: true, email };
        }

        return { isValid: false };
    } catch (error) {
        console.error(error);
        return { isValid: false };
    }
}

export default validateFromEmailToken;