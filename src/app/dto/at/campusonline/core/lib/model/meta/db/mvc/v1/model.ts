import {CoMetaDto} from '../../../../../../../../../at/campusonline/core/lib/model/codata/model';

import {MetadataVersionType} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/base/v1/model';

import {TableDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/view/model';

import {FilterMvcControlsDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/control/model';

import {FiltersDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/view/model';

import {ControlsDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/control/model';

import {ViewDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/view/model';

import {ModelsDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/mvc/v1/model/model';

export interface GenericMvcDto {
  models?:ModelsDto;
  view?:ViewDto;
  controls?:ControlsDto;
}

export interface FilterMvcDto {
  models?:ModelsDto;
  filters?:FiltersDto;
  controls?:FilterMvcControlsDto;
}

export interface TableMvcDto {
  models?:ModelsDto;
  table?:TableDto;
}

export interface MvcMetadataDto {
  _version:MetadataVersionType;
  mvc?:CoMetaDto;
  _path?:string;
  _method?:string;
}

