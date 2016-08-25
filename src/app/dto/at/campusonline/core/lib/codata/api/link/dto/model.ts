import {CoRelType} from '../../../../../../../../at/campusonline/core/lib/model/codata/annotation/link/model';

export interface CoLink {
  _rel:CoRelType;
  _href:string;
  _type:string;
  _summary?:string;
  _key?:string;
  _target?:string;
  _expanded?:boolean;
}

