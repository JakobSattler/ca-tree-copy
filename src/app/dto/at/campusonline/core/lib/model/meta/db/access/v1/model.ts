import {MetadataVersionType} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {UrlParameterDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

export interface PermissionDto {
}

export interface RightDto extends PermissionDto {
  _app?:string;
  _name?:string;
  _anyorg?:boolean;
}

export interface IdentityDto extends PermissionDto {
  _id?:string;
  _domain?:string;
}

export interface RoleDto extends PermissionDto {
  _name?:string;
}

export interface DataServicePermissionDto {
  _uri:string;
}

export interface PlsqlPermissionDto {
  _name?:string;
  _function?:string;
}

export enum LogicalOperationDto {
 AND = <any>'AND', 
 OR = <any>'OR'
}

export interface OrgDto {
  param?:Array<UrlParameterDto>;
  _name:string;
}

export interface CompoundPermissionDto extends PermissionDto {
  permissions?:Array<PermissionDto>;
  _operator?:LogicalOperationDto;
  _name?:string;
  org?:Array<OrgDto>;
}

export interface AccessMetadataDto {
  permissions?:CompoundPermissionDto;
  org?:Array<UrlParameterDto>;
  _version:MetadataVersionType;
}

