export interface IFolderView {
    id: number;
    name: string;
    depth: number;
    parentId: number;
    children: Array<IFolderView>
    isRoot: boolean;
    isLeaf: boolean;
}