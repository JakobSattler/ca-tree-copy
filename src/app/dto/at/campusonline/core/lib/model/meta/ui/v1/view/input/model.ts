import {CoMetaDto} from '../../../../../../../../../../at/campusonline/core/lib/model/codata/model';

import {CoRelType} from '../../../../../../../../../../at/campusonline/core/lib/model/codata/annotation/link/model';

import {FilterOperatorType} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

export interface AbstractInputDto {
  _label?:string;
  _placeholder?:string;
  _tooltip?:string;
  _required?:boolean;
  _readonly?:boolean;
  _operator?:FilterOperatorType;
}

export enum InputFieldType {
 text = <any>'TEXT', 
 number = <any>'NUMBER', 
 boolean = <any>'BOOLEAN'
}

export enum InputType {
 text = <any>'TEXT', 
 number = <any>'NUMBER', 
 checkbox = <any>'CHECKBOX'
}

export interface InputDto extends AbstractInputDto {
  _field?:string;
  _fieldType?:InputFieldType;
  _type?:InputType;
  _min?:string;
  _max?:string;
  value?:string;
}

export interface DateRangeDto extends AbstractInputDto {
  _startDateField?:string;
  _endDateField?:string;
  _min?:string;
  _max?:string;
  _start?:string;
  end?:string;
}

export interface DateDto extends AbstractInputDto {
  _field?:string;
  _min?:string;
  _max?:string;
  value?:string;
}

export enum SelectFieldType {
 text = <any>'TEXT', 
 number = <any>'NUMBER'
}

export interface SelectTypeValueDto {
  _label?:string;
  value?:string;
}

export interface AbstractSelectDto extends AbstractInputDto {
  _field?:string;
  _fieldType?:SelectFieldType;
  _uri?:string;
  values?:Array<SelectTypeValueDto>;
}

export enum SelectType {
 radio = <any>'RADIO', 
 dropdown = <any>'DROPDOWN'
}

export interface SelectDto extends AbstractSelectDto {
  _values?:Array<String>;
  _type?:SelectType;
}

export enum MultiSelectType {
 checkbox = <any>'CHECKBOX', 
 list = <any>'LIST'
}

export interface SelectTypeSelectedDto {
  value?:string;
}

export interface MultiSelectDto extends AbstractSelectDto {
  _type?:MultiSelectType;
  selected?:Array<SelectTypeSelectedDto>;
}

export interface InputGroupDto {
  _label?:string;
  inputItem?:Array<InputItemDto>;
}

export interface ButtonActionDto {
  _rel?:CoRelType;
  value?:string;
}

export interface ButtonDto extends AbstractInputDto {
  _icon?:string;
  _disabled?:boolean;
  _hidden?:boolean;
  _label?:string;
  _tooltip?:string;
  action?:ButtonActionDto;
}

export interface DividerDto {
  divider?:string;
}

export interface InputItemDto {
  input?:AbstractInputDto;
}

export interface FilterItemDto {
  filter?:CoMetaDto;
}

