export type Paginated<T> = {
    data: T[];
    meta: {
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
        currentPage: number;
    };
    links: {
        first: string;
        last: string;
        next: string;
        previous: string;
    };
};