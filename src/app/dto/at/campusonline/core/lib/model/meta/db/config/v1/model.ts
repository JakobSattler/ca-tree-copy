import {CoMetaDto} from '../../../../../../../../../at/campusonline/core/lib/model/codata/model';

export enum UsecaseType {
 TABLE = <any>'TABLE', 
 EXPORT = <any>'EXPORT', 
 EXP_EXTERN = <any>'EXP_EXTERN', 
 REST = <any>'REST'
}

export interface UseCaseTypeDto {
  _type:UsecaseType;
  useCaseId?:string;
}

export interface ConfigurationDto {
  uri:string;
  modul?:string;
  usecase?:UseCaseTypeDto;
  group?:string;
  coMetaDtoList?:Array<CoMetaDto>;
}

