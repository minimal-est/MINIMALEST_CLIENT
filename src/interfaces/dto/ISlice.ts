export interface ISlice<T> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    numberOfElements: number;
}