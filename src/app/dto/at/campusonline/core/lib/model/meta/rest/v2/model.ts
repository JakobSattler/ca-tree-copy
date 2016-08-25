import {MetadataVersionType} from '../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {UrlParameterDto} from '../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {CompoundPermissionDto} from '../../../../../../../../at/campusonline/core/lib/model/meta/db/access/v1/model';

export interface MethodContentType {
  _type?:string;
  _list?:boolean;
  _rootElement?:string;
}

export interface ResourceParameterDto {
  _id?:string;
  _required?:boolean;
  _dataType?:string;
  _type?:string;
  _description?:string;
}

export interface Parameters {
  parameter?:Array<ResourceParameterDto>;
}

export interface ResourceMethodDto {
  method?:string;
  info?:string;
  contentType?:MethodContentType;
  acceptType?:MethodContentType;
  parameters?:Parameters;
}

export interface MethodMetadataDto {
  permissions?:CompoundPermissionDto;
  org?:Array<UrlParameterDto>;
  _version:MetadataVersionType;
  methods?:Array<ResourceMethodDto>;
}

export interface TranslationDto {
  _key?:string;
  translation?:string;
}

export interface TranslationsDto {
  translation?:Array<TranslationDto>;
}

