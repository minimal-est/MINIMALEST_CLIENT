import instance from "../../utils/instance.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";

const fetchFolderDelete = async (author: string, folderId: number) => {
    const response = await instance.delete<IApiResponse<string>>(`/api/archive/${author}/folder/${folderId}`);
    return response.data['data']!;
}

const useFolderDelete = () => {
    return useMutation<string, AxiosError<never>, {author: string, folderId: number}>({
        mutationFn: ({author, folderId}) => fetchFolderDelete(author, folderId),
    })
}

export default useFolderDelete;