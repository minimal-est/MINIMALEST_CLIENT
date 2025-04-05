export interface IPostView {
    author: string;
    title: string;
    content: string;
    folderId: number;
    folderName: string;
    postRole: string;
    isModified: boolean;
    hitCount: number;
    thumbnailUrl: string;
    createdAt: string;
    lastModifiedAt: string;
}