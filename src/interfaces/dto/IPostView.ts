export interface IPostView {
    author: string;
    title: string;
    content: string;
    folderId: number;
    folderName: string;
    postRole: string;
    isModified: boolean;
    hitCount: number;
    createdAt: string;
    lastModifiedAt: string;
}