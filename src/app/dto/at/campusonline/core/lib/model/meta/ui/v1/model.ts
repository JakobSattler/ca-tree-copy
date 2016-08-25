import {CoMetaDto} from '../../../../../../../../at/campusonline/core/lib/model/codata/model';

export enum UsecaseType {
 TABLE = <any>'TABLE', 
 MASK = <any>'MASK'
}

export interface UseCaseDto {
  _type:UsecaseType;
  _id?:string;
  coMetaDtos?:Array<CoMetaDto>;
}

