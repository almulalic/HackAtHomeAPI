import { GridFilterType } from './Enumerations';
import { OrderType } from './Types';
import { HttpStatus } from '@nestjs/common';
export declare class GridDataFilter {
    type: GridFilterType;
    key: string;
    value: string;
}
export declare class GridParams {
    page: number;
    itemsPerPage: number;
    sortBy?: string;
    order: OrderType;
    filters: GridDataFilter[];
    constructor(page: number, itemsPerPage: number, sortBy: string, order: OrderType);
}
export declare class ResponseGrid<T> {
    private readonly total;
    private readonly records;
    constructor(records: T[]);
    GetGridData(gridParams: GridParams): Promise<ResponseGrid<T>>;
}
export declare class OkResponse {
    statusCode: HttpStatus;
    message: string | boolean | number;
}
export declare function Ok(message: string | boolean | number, statusCode?: HttpStatus): {
    statusCode: HttpStatus;
    message: string | number | boolean;
};
