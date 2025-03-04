import fetchEmailFromToken from "./fetchEmailFromToken.ts";
import {IMemberFindResponse} from "../interfaces/dto/IMemberFindResponse.ts";
import instance from "./instance.ts";
import {IApiResponse} from "../interfaces/dto/IApiResponse.ts";

const validateAuthorFromEmailToken = async (author: string) => {
    const email = await fetchEmailFromToken();
    if (!email) return false;

    try {
        const response = await instance.get<IApiResponse<IMemberFindResponse>>(`/api/member/${email}/archive/${author}`);
        const data = response.data['data'];

        if (data && data.email === email) {
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default validateAuthorFromEmailToken;