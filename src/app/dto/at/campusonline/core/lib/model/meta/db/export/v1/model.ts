import {BaseMetadataDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {CoLangDataTypeDto} from '../../../../../../../../../at/campusonline/core/lib/model/langdata/model';

export enum DurationType {
 SHORT = <any>'SHORT', 
 LONG = <any>'LONG'
}

export interface MimeTypeDto {
  'mime-type-nr'?:number;
  'mime-type-key'?:string;
  'mime-type-name'?:string;
  'content-type'?:string;
  'file-extension'?:string;
  marshaller?:string;
}

export interface ExportDto {
  name:CoLangDataTypeDto;
  description?:CoLangDataTypeDto;
  _duration?:DurationType;
  maxexecminutes?:number;
  maxfilesizebytes?:number;
  maxstorageminutes?:number;
  maxqueueminutes?:number;
  'file-name'?:string;
  exportUrl?:string;
  'mime-types'?:Array<MimeTypeDto>;
}

export interface ExportMetadataDto extends BaseMetadataDto {
  export?:ExportDto;
}

