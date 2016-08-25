import {Direction} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/db/query/v2/model';

import {FilterItemDto} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/ui/v1/view/input/model';

import {ButtonDto} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/ui/v1/view/input/model';

import {InputItemDto} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/ui/v1/view/input/model';

export interface CardDto {
  _label?:string;
  _id?:string;
  _expandable?:boolean;
  _expanded?:boolean;
  inputItem?:Array<InputItemDto>;
  buttons?:Array<ButtonDto>;
}

export enum TableColAlignmentType {
 LEFT = <any>'LEFT', 
 CENTER = <any>'CENTER', 
 RIGHT = <any>'RIGHT'
}

export enum TableColFieldType {
 text = <any>'TEXT', 
 date = <any>'DATE', 
 number = <any>'NUMBER', 
 select = <any>'SELECT'
}

export interface TableColFilterDto {
  _allowed?:boolean;
  filterItem?:Array<FilterItemDto>;
}

export interface TableColSortDto {
  _allowed?:boolean;
  _tooltip?:string;
  active?:Direction;
}

export interface TableColDto {
  _alignment?:TableColAlignmentType;
  _title?:string;
  _label?:string;
  _field?:string;
  _fieldtype?:TableColFieldType;
  filter?:TableColFilterDto;
  sort?:TableColSortDto;
}

export interface TableColsDto {
  col?:Array<TableColDto>;
}

