import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {CoContentDto} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/model';
import {CaResourcesService} from '../../../../../../core/lib/services/co-resources-service/ca-resources.service';
import {CaDataService, CaUri} from '../../../../../../core/lib/services/co-data/ca-data.service';
import {CoResources} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CaResourcesBaseAction} from '../../../../../../core/lib/services/co-resources-service/ca-resources.action';
import {CaBaseMvcModel} from '../../../../../../core/lib/services/co-resources-service/ca-base-mvc.model';
import {CaTreeComponent} from '../../components/ca-tree.component';
import {BasicTreeNode} from './ca-tree-mvc-model';
import * as actions from './ca-tree-actions';
//import * as actions from './ca-table.actions';

@Injectable()
export class CaTreeMvcService<T extends CoContentDto> extends CaResourcesService<T> {

  caTreeComponent: CaTreeComponent;

  constructor(private _caDataService: CaDataService<T>) {
    super(_caDataService);
  }

  dispatchAction(action: CaResourcesBaseAction): Observable<CoResources<T>> {
    //switch (action.action) {
    //  case actions.CA_TABLE_DELETE:
    //    return this.fetchDataModel(action.localModel);
    //  default:
    //    return this.fetchDataModel(action.localModel);
    //}
    switch (action.action) {
      case actions.CA_TREE_EDIT:
        console.log('ca_tree_edit');
        return this.fetchDataModel(action.model, this.caTreeComponent.caUri);
      default:
        console.log('default');
    }
    return null;
  }

  init(uri: CaUri): Observable<CoResources<T>> {
    return this.fetchDataModel(null, uri);
  }

  fetchDataModel(model: CaBaseMvcModel, uri?: CaUri): Observable<CoResources<T>> {
    return super.fetchDataModel(model, uri);
  }

  updateNode(uri: CaUri, nr: number, newName: String): void {
    let node: BasicTreeNode;
    this.init(uri).subscribe(resource => {
      //find old node using nr, replace its name with the new one
      node = (<any>resource).resource.filter(res => (<any>res).content.nr === nr + '')[0].content as BasicTreeNode;
      let oldNodeString = JSON.stringify(node);
      let newNodeString = oldNodeString.replace(<any>node.name, newName as string);
      this._caDataService.put(uri, JSON.stringify(resource).replace(oldNodeString, newNodeString)).subscribe(error => {
        console.log(error);
      });
    });
  }
}
