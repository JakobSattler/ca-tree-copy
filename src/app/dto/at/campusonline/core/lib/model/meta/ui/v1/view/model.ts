import {TableColsDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/ui/v1/view/container/model';

import {PagingDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/db/query/v2/model';

import {CardDto} from '../../../../../../../../../at/campusonline/core/lib/model/meta/ui/v1/view/container/model';

export interface MaskMvcDto {
  cards?:Array<CardDto>;
}

export interface TableMvcDto {
  paging?:PagingDto;
  cols?:TableColsDto;
}

