import {AttributeType} from '../../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

export interface AttributePatternDto {
  _js:string;
  _plsql:string;
}

export interface ModelAttributeDefinition {
  pattern?:AttributePatternDto;
  _name:string;
  _type:AttributeType;
  _nullable?:boolean;
  _size?:number;
  _precision?:string;
  _scale?:string;
  _minInclusive?:string;
  _maxInclusive?:string;
  _fractionDigits?:string;
  '_date-subformat'?:string;
  _default?:string;
  _required?:string;
}

export interface AbstractModelDto {
  attribute?:Array<ModelAttributeDefinition>;
  _name?:string;
}

export interface BaseModelDto extends AbstractModelDto {
}

export interface ModelDto extends AbstractModelDto {
}

export interface OptionDto {
  _text?:string;
  _key:string;
  _disabled?:string;
  _selected?:string;
}

export interface OptionGroupDto {
  option:Array<OptionDto>;
}

export interface Group extends OptionGroupDto {
  _text:string;
  _disabled?:string;
}

export interface InlineOptionModelDto {
  groupOrOption?:Array<Object>;
}

export interface Inline extends InlineOptionModelDto {
}

export interface TableOptionModelDto {
  _schema:string;
  _table:string;
  '_key-column-name':string;
  '_text-column-name':string;
  '_selected-column-name'?:string;
  '_disabled-column-name'?:string;
  '_group-text-column-name'?:string;
  '_group-disabled-column-name'?:string;
}

export interface DataServiceModelDto {
  _uri:string;
  '_key-column-name'?:string;
  '_text-column-name'?:string;
}

export interface OptionModelDto {
  inline?:Inline;
  table?:TableOptionModelDto;
  'data-service'?:DataServiceModelDto;
  _name:string;
}

export interface DocumentStoreModelDto {
  attribute:ModelAttributeDefinition;
  _name:string;
  _schema:string;
  _table:string;
}

export interface ModelsDto {
  base?:BaseModelDto;
  modelOrOptionModelOrDocumentStoreModel?:Array<any>;
}

