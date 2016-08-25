import {FilterOperatorType} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

export interface EventDto {
  _type:string;
  _control:string;
}

export interface AbstractInputDto {
  events?:Array<EventDto>;
}

export interface TextInputDto extends AbstractInputDto {
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface TextAreaInputDto extends AbstractInputDto {
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface PasswordInputDto extends AbstractInputDto {
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface HiddenInputDto extends AbstractInputDto {
  _model?:string;
  _name?:string;
  _attribute?:string;
}

export interface PlaintextInputDto extends AbstractInputDto {
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface FileInputDto extends AbstractInputDto {
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface CheckInputDto extends AbstractInputDto {
  '_option-model':string;
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface RadioInputDto extends AbstractInputDto {
  '_option-model':string;
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface SelectInputDto extends AbstractInputDto {
  '_option-model':string;
  _model?:string;
  _attribute:string;
  _name?:string;
  _label?:string;
}

export interface ContainerDto {
  element?:Array<Object>;
  _name?:string;
  _label?:string;
}

export interface ViewDto {
  textOrTextareaOrPassword?:Array<Object>;
}

export interface FilterInputDto {
  _operator?:FilterOperatorType;
  input?:AbstractInputDto;
}

export interface FiltersDto {
  filter?:Array<FilterInputDto>;
}

export enum AlignmentType {
 LEFT = <any>'LEFT', 
 CENTER = <any>'CENTER', 
 RIGHT = <any>'RIGHT'
}

export interface TableColDto {
  _model?:string;
  _attribute:string;
  _label?:string;
  _align?:AlignmentType;
  _sortable?:string;
  _hideable?:string;
}

export interface TableDto {
  paging?:any;
  cols?:Array<TableColDto>;
}

