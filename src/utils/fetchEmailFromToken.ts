import {jwtDecode} from "jwt-decode";
import instance from "./instance.ts";

const fetchEmailFromToken = async () => {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        try {
            const refreshResponse = await instance.post('/api/auth/token/refresh');
            const newAccessToken = refreshResponse.headers['minimalest-access-token'];
            localStorage.setItem('accessToken', newAccessToken);
            console.log('AccessToken을 임의적으로 재발급 받았음');
            accessToken = newAccessToken;
        } catch (refreshError) {
            console.error('AccessToken 재발급 실패: ', refreshError);
            localStorage.removeItem('accessToken');
            return null;
        }
    }

    if (accessToken) {
        try {
            const decodedToken = jwtDecode(accessToken);
            return decodedToken?.sub ?? ' ';
        } catch (error) {
            console.error('토큰 디코딩 실패: ', error);
            return null;
        }
    }
}

export default fetchEmailFromToken;