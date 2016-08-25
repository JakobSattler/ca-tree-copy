import {Injectable} from '@angular/core';
import {CaResourcesBaseAction} from './ca-resources.action';
import {CaDataService, CaUri} from '../co-data/ca-data.service';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {Observable} from 'rxjs/Rx';
import {CaBaseMvcModel} from './ca-base-mvc.model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';

@Injectable()
export abstract class CaResourcesService<T extends CoContentDto> {

  constructor(private caDataService:CaDataService<T>) {
    //empty
  }

  abstract dispatchAction(action:CaResourcesBaseAction):Observable<CoResources<T>>;

  abstract init(uri:CaUri):Observable<CoResources<T>>;

  fetchDataModel(model:CaBaseMvcModel, uri?:CaUri):Observable<CoResources<T>> {
    if (!model && !uri) {
      return null;
    }
    if (!uri) {
      uri = model.getUri();
    }
    return Observable.create(observer => {
      this.caDataService.get(uri).subscribe(resource => {
          observer.next(resource);
          observer.complete();
        },
        err => {
          console.log('CaTableMvcService: an error occured during fetching');
        });
    });
  }
}
