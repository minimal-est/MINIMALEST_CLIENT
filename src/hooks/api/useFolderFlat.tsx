import instance from "../../utils/instance.ts";
import {IFolderView} from "../../interfaces/dto/IFolderView.ts";
import {IApiResponse} from "../../interfaces/dto/IApiResponse.ts";
import {useQuery} from "@tanstack/react-query";

const fetchFolderFlat = async (author: string) => {
    const response = await instance.get<IApiResponse<Array<IFolderView>>>(`/api/archive/${author}/folder/flat`);
    return response.data['data']!;
}

const useFolderFlat = (author: string) => {
    return useQuery<Array<IFolderView>>({
        queryKey: ['folderFlat', author],
        queryFn: () => fetchFolderFlat(author),
        enabled: Boolean(author)
    });
}

export default useFolderFlat;