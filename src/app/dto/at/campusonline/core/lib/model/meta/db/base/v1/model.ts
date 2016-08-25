export enum UrlParameterType {
 SIMPLE = <any>'SIMPLE', 
 COFWK = <any>'COFWK', 
 ODATA = <any>'ODATA'
}

export interface UrlParameterDto {
  _name:string;
  _type?:UrlParameterType;
}

export enum MetadataVersionType {
 CONFIG_1_0 = <any>'CONFIG_1_0', 
 QUERY_2_0 = <any>'QUERY_2_0', 
 QUERY_1_10 = <any>'QUERY_1_10', 
 QUERY_1_0 = <any>'QUERY_1_0', 
 ACCESS_1_0 = <any>'ACCESS_1_0', 
 EXPORT_1_0 = <any>'EXPORT_1_0', 
 MVC_1_0 = <any>'MVC_1_0', 
 MVC_2_0 = <any>'MVC_2_0', 
 ACTION_1_0 = <any>'ACTION_1_0', 
 REST_2_0 = <any>'REST_2_0', 
 REST_1_0 = <any>'REST_1_0', 
 TABLE_1_0 = <any>'TABLE_1_0', 
 TABLE_1_10 = <any>'TABLE_1_10', 
 FILTER_1_0 = <any>'FILTER_1_0'
}

export enum AttributeType {
 string = <any>'STRING', 
 date = <any>'DATE', 
 number = <any>'DECIMAL'
}

export enum FilterOperatorType {
 CUSTOM = <any>'CUSTOM', 
 BETWEEN = <any>'BETWEEN', 
 GREATER_THAN = <any>'GREATER_THAN', 
 GREATER_THAN_EQUALS = <any>'GREATER_THAN_EQUALS', 
 ENDS_WITH = <any>'ENDS_WITH', 
 ENDS_WITH_IGNORE_CASE = <any>'ENDS_WITH_IGNORE_CASE', 
 EQUALS = <any>'EQUALS', 
 EQUALS_IGNORE_CASE = <any>'EQUALS_IGNORE_CASE', 
 IN = <any>'IN', 
 IS_NULL = <any>'IS_NULL', 
 IS_NOT_NULL = <any>'IS_NOT_NULL', 
 LESS_THAN = <any>'LESS_THAN', 
 LESS_THAN_EQUALS = <any>'LESS_THAN_EQUALS', 
 LIKE = <any>'LIKE', 
 LIKE_IGNORE_CASE = <any>'LIKE_IGNORE_CASE', 
 NOT_ENDS_WITH = <any>'NOT_ENDS_WITH', 
 NOT_ENDS_WITH_IGNORE_CASE = <any>'NOT_ENDS_WITH_IGNORE_CASE', 
 NOT_EQUALS = <any>'NOT_EQUALS', 
 NOT_IN = <any>'NOT_IN', 
 NOT_LIKE = <any>'NOT_LIKE', 
 NOT_LIKE_IGNORE_CASE = <any>'NOT_LIKE_IGNORE_CASE', 
 NOT_STARTS_WITH = <any>'NOT_STARTS_WITH', 
 NOT_STARTS_WITH_IGNORE_CASE = <any>'NOT_STARTS_WITH_IGNORE_CASE', 
 STARTS_WITH = <any>'STARTS_WITH', 
 STARTS_WITH_IGNORE_CASE = <any>'STARTS_WITH_IGNORE_CASE'
}

export interface BaseMetadataDto {
  _version:MetadataVersionType;
}

export interface UrlParameterValueDto {
  _param?:string;
  value?:string;
}

