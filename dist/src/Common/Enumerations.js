"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageType = exports.RoleTypes = exports.GridFilterType = void 0;
var GridFilterType;
(function (GridFilterType) {
    GridFilterType[GridFilterType["Range"] = 1] = "Range";
    GridFilterType[GridFilterType["Match"] = 2] = "Match";
    GridFilterType[GridFilterType["Contains"] = 3] = "Contains";
})(GridFilterType = exports.GridFilterType || (exports.GridFilterType = {}));
var RoleTypes;
(function (RoleTypes) {
    RoleTypes[RoleTypes["Customer"] = 0] = "Customer";
    RoleTypes[RoleTypes["Admin"] = 1] = "Admin";
})(RoleTypes = exports.RoleTypes || (exports.RoleTypes = {}));
var ImageType;
(function (ImageType) {
    ImageType[ImageType["Generic"] = 0] = "Generic";
    ImageType[ImageType["Product"] = 1] = "Product";
})(ImageType = exports.ImageType || (exports.ImageType = {}));
//# sourceMappingURL=Enumerations.js.map