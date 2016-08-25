import {UrlParameterValueDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {BaseMetadataDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {FilterOperatorType} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {AttributeType} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {UrlParameterDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

export interface DataserviceDto {
}

export interface TableDataserviceDto extends DataserviceDto {
  schema:string;
  name:string;
}

export interface StmtDataserviceDto extends DataserviceDto {
  sql?:string;
}

export interface ExternDataserviceDto extends DataserviceDto {
  'base-url'?:string;
  'relative-url'?:string;
}

export interface PuQueryDataserviceDto extends DataserviceDto {
  schema?:string;
  procedure?:string;
}

export interface SelectsDto {
  select?:Array<String>;
}

export enum InfoType {
 TEXT = <any>'TEXT', 
 ALPHA = <any>'ALPHA'
}

export interface PagingDto {
  _entries?:number;
  _pages?:number;
  _page?:number;
  _type?:InfoType;
  param?:Array<UrlParameterDto>;
}

export interface ValueDto {
  value?:string;
  _type?:AttributeType;
}

export interface ValuesDto {
  values?:Array<ValueDto>;
  _type?:AttributeType;
}

export interface BindVariableDto {
  _name:string;
  value?:Array<any>;
  param?:Array<UrlParameterDto>;
  _directBind?:string;
}

export interface FilterDto {
  _attribute:string;
  _operator:FilterOperatorType;
  value?:ValueDto;
  param?:Array<UrlParameterDto>;
}

export interface FiltersDto {
  param?:Array<UrlParameterDto>;
  filter?:Array<FilterDto>;
}

export enum Direction {
 ASC = <any>'ASC', 
 DESC = <any>'DESC'
}

export enum NullsOrdering {
 FIRST = <any>'FIRST', 
 LAST = <any>'LAST'
}

export interface SortingDto {
  _attribute:string;
  _dir?:Direction;
  _nulls?:NullsOrdering;
  param?:Array<UrlParameterDto>;
}

export interface PossibleSortingDto {
  sort?:Array<SortingDto>;
}

export interface DefaultSortingDto {
  sort?:Array<SortingDto>;
}

export interface SortingsDto {
  param?:Array<UrlParameterDto>;
  possible?:PossibleSortingDto;
  default?:DefaultSortingDto;
  sort?:Array<SortingDto>;
}

export interface QueryDto {
  dataservice?:DataserviceDto;
  selects?:SelectsDto;
  paging?:PagingDto;
  binds?:Array<BindVariableDto>;
  filters?:FiltersDto;
  sortings?:SortingsDto;
  wrapper?:string;
}

export interface QueryMetadataDto extends BaseMetadataDto {
  'param-values'?:Array<UrlParameterValueDto>;
  query?:QueryDto;
}

