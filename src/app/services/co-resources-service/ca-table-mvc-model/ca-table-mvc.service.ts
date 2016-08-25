import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {CaResourcesService} from '../ca-resources.service';
import {CaResourcesBaseAction} from '../ca-resources.action';
import {CoContentDto} from '../../../dto/at/campusonline/core/lib/model/codata/model';
import * as actions from './ca-table.actions';
import {CoResources} from '../../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CaUri, CaDataService} from '../../co-data/ca-data.service';
import {CaBaseMvcModel} from '../ca-base-mvc.model';

@Injectable()
export class CaTableMvcService<T extends CoContentDto> extends CaResourcesService<T> {

  constructor(caDataService:CaDataService<T>) {
    super(caDataService);
  }

  dispatchAction(action:CaResourcesBaseAction):Observable<CoResources<T>> {
    switch (action.action) {
      case actions.CA_TABLE_DELETE:
        return this.fetchDataModel(action.model);
      default:
        return this.fetchDataModel(action.model);
    }
  }

  init(uri:CaUri):Observable<CoResources<T>> {
    return this.fetchDataModel(null, uri);
  }

  fetchDataModel(model:CaBaseMvcModel, uri?:CaUri):Observable<CoResources<T>> {
    return super.fetchDataModel(model, uri);
  }
}
