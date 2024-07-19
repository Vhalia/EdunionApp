
export interface PagedResponseDto<T> {
    result: T[];
    count: number;
    nextIndex: number;
}