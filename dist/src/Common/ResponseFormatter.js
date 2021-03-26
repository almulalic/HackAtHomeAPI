"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ok = exports.OkResponse = exports.ResponseGrid = exports.GridParams = exports.GridDataFilter = void 0;
const Enumerations_1 = require("./Enumerations");
class GridDataFilter {
}
exports.GridDataFilter = GridDataFilter;
class GridParams {
    constructor(page, itemsPerPage, sortBy, order) {
        this.sortBy = 'createdAt';
        this.order = 'ASC';
        this.page = page;
        this.itemsPerPage = itemsPerPage;
        this.sortBy = sortBy;
        this.order = order;
    }
}
exports.GridParams = GridParams;
class ResponseGrid {
    constructor(records) {
        this.total = records.length;
        this.records = records;
    }
    async GetGridData(gridParams) {
        if (this.records.length === 0)
            return new ResponseGrid(this.records);
        let filtered = this.records;
        await gridParams.filters.forEach((filter) => {
            switch (filter.type) {
                case Enumerations_1.GridFilterType.Match:
                    if (filter.value || filter.value.length > 0)
                        filtered = this.records.filter((record) => record[filter.key] == filter.value);
                    break;
                case Enumerations_1.GridFilterType.Range:
                    if (filter.value || filter.value.length > 0)
                        filtered = this.records.filter((record) => record[filter.key] >= filter.value[0] && record[filter.key] <= filter.value[1]);
                    break;
                case Enumerations_1.GridFilterType.Contains:
                    if (filter.value || filter.value.length > 0)
                        filtered = this.records.filter((record) => record[filter.key].includes(filter.value));
                    break;
            }
        });
        return new ResponseGrid(filtered);
    }
}
exports.ResponseGrid = ResponseGrid;
class OkResponse {
}
exports.OkResponse = OkResponse;
function Ok(message, statusCode = 200) {
    return {
        statusCode: statusCode,
        message: message,
    };
}
exports.Ok = Ok;
//# sourceMappingURL=ResponseFormatter.js.map