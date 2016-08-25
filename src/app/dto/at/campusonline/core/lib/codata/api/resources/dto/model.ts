import {CoMetaDto} from '../../../../../../../../at/campusonline/core/lib/model/codata/model';

import {CoContentDto} from '../../../../../../../../at/campusonline/core/lib/model/codata/model';

import {CoLink} from '../../../../../../../../at/campusonline/core/lib/codata/api/link/dto/model';

export interface AbstractCoResourceDto<T extends CoContentDto> {
  link?:Array<CoLink>;
}

export interface CoSubResource<T extends CoContentDto> extends AbstractCoResourceDto<T> {
}

export interface CoResource<T extends CoContentDto> extends AbstractCoResourceDto<T> {
  content?:T;
  subresources?:CoSubResource<T>;
}

export interface CoResources<T extends CoContentDto> extends AbstractCoResourceDto<T> {
  meta?:Array<CoMetaDto>;
  resource?:Array<CoResource<T>>;
}

