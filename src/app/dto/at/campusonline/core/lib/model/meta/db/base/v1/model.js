"use strict";
(function (UrlParameterType) {
    UrlParameterType[UrlParameterType["SIMPLE"] = 'SIMPLE'] = "SIMPLE";
    UrlParameterType[UrlParameterType["COFWK"] = 'COFWK'] = "COFWK";
    UrlParameterType[UrlParameterType["ODATA"] = 'ODATA'] = "ODATA";
})(exports.UrlParameterType || (exports.UrlParameterType = {}));
var UrlParameterType = exports.UrlParameterType;
(function (MetadataVersionType) {
    MetadataVersionType[MetadataVersionType["CONFIG_1_0"] = 'CONFIG_1_0'] = "CONFIG_1_0";
    MetadataVersionType[MetadataVersionType["QUERY_2_0"] = 'QUERY_2_0'] = "QUERY_2_0";
    MetadataVersionType[MetadataVersionType["QUERY_1_10"] = 'QUERY_1_10'] = "QUERY_1_10";
    MetadataVersionType[MetadataVersionType["QUERY_1_0"] = 'QUERY_1_0'] = "QUERY_1_0";
    MetadataVersionType[MetadataVersionType["ACCESS_1_0"] = 'ACCESS_1_0'] = "ACCESS_1_0";
    MetadataVersionType[MetadataVersionType["EXPORT_1_0"] = 'EXPORT_1_0'] = "EXPORT_1_0";
    MetadataVersionType[MetadataVersionType["MVC_1_0"] = 'MVC_1_0'] = "MVC_1_0";
    MetadataVersionType[MetadataVersionType["MVC_2_0"] = 'MVC_2_0'] = "MVC_2_0";
    MetadataVersionType[MetadataVersionType["ACTION_1_0"] = 'ACTION_1_0'] = "ACTION_1_0";
    MetadataVersionType[MetadataVersionType["REST_2_0"] = 'REST_2_0'] = "REST_2_0";
    MetadataVersionType[MetadataVersionType["REST_1_0"] = 'REST_1_0'] = "REST_1_0";
    MetadataVersionType[MetadataVersionType["TABLE_1_0"] = 'TABLE_1_0'] = "TABLE_1_0";
    MetadataVersionType[MetadataVersionType["TABLE_1_10"] = 'TABLE_1_10'] = "TABLE_1_10";
    MetadataVersionType[MetadataVersionType["FILTER_1_0"] = 'FILTER_1_0'] = "FILTER_1_0";
})(exports.MetadataVersionType || (exports.MetadataVersionType = {}));
var MetadataVersionType = exports.MetadataVersionType;
(function (AttributeType) {
    AttributeType[AttributeType["string"] = 'STRING'] = "string";
    AttributeType[AttributeType["date"] = 'DATE'] = "date";
    AttributeType[AttributeType["number"] = 'DECIMAL'] = "number";
})(exports.AttributeType || (exports.AttributeType = {}));
var AttributeType = exports.AttributeType;
(function (FilterOperatorType) {
    FilterOperatorType[FilterOperatorType["CUSTOM"] = 'CUSTOM'] = "CUSTOM";
    FilterOperatorType[FilterOperatorType["BETWEEN"] = 'BETWEEN'] = "BETWEEN";
    FilterOperatorType[FilterOperatorType["GREATER_THAN"] = 'GREATER_THAN'] = "GREATER_THAN";
    FilterOperatorType[FilterOperatorType["GREATER_THAN_EQUALS"] = 'GREATER_THAN_EQUALS'] = "GREATER_THAN_EQUALS";
    FilterOperatorType[FilterOperatorType["ENDS_WITH"] = 'ENDS_WITH'] = "ENDS_WITH";
    FilterOperatorType[FilterOperatorType["ENDS_WITH_IGNORE_CASE"] = 'ENDS_WITH_IGNORE_CASE'] = "ENDS_WITH_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["EQUALS"] = 'EQUALS'] = "EQUALS";
    FilterOperatorType[FilterOperatorType["EQUALS_IGNORE_CASE"] = 'EQUALS_IGNORE_CASE'] = "EQUALS_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["IN"] = 'IN'] = "IN";
    FilterOperatorType[FilterOperatorType["IS_NULL"] = 'IS_NULL'] = "IS_NULL";
    FilterOperatorType[FilterOperatorType["IS_NOT_NULL"] = 'IS_NOT_NULL'] = "IS_NOT_NULL";
    FilterOperatorType[FilterOperatorType["LESS_THAN"] = 'LESS_THAN'] = "LESS_THAN";
    FilterOperatorType[FilterOperatorType["LESS_THAN_EQUALS"] = 'LESS_THAN_EQUALS'] = "LESS_THAN_EQUALS";
    FilterOperatorType[FilterOperatorType["LIKE"] = 'LIKE'] = "LIKE";
    FilterOperatorType[FilterOperatorType["LIKE_IGNORE_CASE"] = 'LIKE_IGNORE_CASE'] = "LIKE_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["NOT_ENDS_WITH"] = 'NOT_ENDS_WITH'] = "NOT_ENDS_WITH";
    FilterOperatorType[FilterOperatorType["NOT_ENDS_WITH_IGNORE_CASE"] = 'NOT_ENDS_WITH_IGNORE_CASE'] = "NOT_ENDS_WITH_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["NOT_EQUALS"] = 'NOT_EQUALS'] = "NOT_EQUALS";
    FilterOperatorType[FilterOperatorType["NOT_IN"] = 'NOT_IN'] = "NOT_IN";
    FilterOperatorType[FilterOperatorType["NOT_LIKE"] = 'NOT_LIKE'] = "NOT_LIKE";
    FilterOperatorType[FilterOperatorType["NOT_LIKE_IGNORE_CASE"] = 'NOT_LIKE_IGNORE_CASE'] = "NOT_LIKE_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["NOT_STARTS_WITH"] = 'NOT_STARTS_WITH'] = "NOT_STARTS_WITH";
    FilterOperatorType[FilterOperatorType["NOT_STARTS_WITH_IGNORE_CASE"] = 'NOT_STARTS_WITH_IGNORE_CASE'] = "NOT_STARTS_WITH_IGNORE_CASE";
    FilterOperatorType[FilterOperatorType["STARTS_WITH"] = 'STARTS_WITH'] = "STARTS_WITH";
    FilterOperatorType[FilterOperatorType["STARTS_WITH_IGNORE_CASE"] = 'STARTS_WITH_IGNORE_CASE'] = "STARTS_WITH_IGNORE_CASE";
})(exports.FilterOperatorType || (exports.FilterOperatorType = {}));
var FilterOperatorType = exports.FilterOperatorType;
//# sourceMappingURL=model.js.map