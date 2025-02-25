import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

//
instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        const status = error.response.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (originalRequest.url === '/api/auth/refresh') {
                return Promise.reject(error);
            }

            try {
                // Refresh Token 활용하여 Access Token 재발급 시도
                const refreshResponse = await instance.post('/api/auth/refresh');
                const newAccessToken = refreshResponse.headers['minimalest-access-token'];

                localStorage.setItem('accessToken', newAccessToken);

                console.log("AccessToken 재발급 성공");

                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return instance(originalRequest);
            } catch (refreshError) {
                console.log("AccessToken 재발급 실패: ", refreshError);

                localStorage.removeItem('accessToken');

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default instance;