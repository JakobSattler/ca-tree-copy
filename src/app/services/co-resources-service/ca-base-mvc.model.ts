import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoResourcesInfo} from '../co-data/co-resources-info.class';
import {CoLink} from '../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CaUri} from '../co-data/ca-data.service';
import {CaLink} from '../co-data/co-data.model';
import {CoRelType} from '../../dto/at/campusonline/core/lib/model/codata/annotation/link/model';
//import {CaUtilsService} from '../ca-utils.service';

export class CaBaseMvcModel {
  resources:CoResources<CoContentDto>;

  static getTableMvcCopy(model:CaBaseMvcModel):CaBaseMvcModel {
    let copy:CaBaseMvcModel;
    //copy = <CaBaseMvcModel>CaUtilsService.deepCopy(model);
    return copy;
  }

  public getResources():CoResources<CoContentDto> {
    return this.resources.resource;
  }

  public getContentRoot():string {
    return new CoResourcesInfo<CoContentDto>(this.resources).getContentRoot();
  }

  public getSelfLink():CoLink {
    /* tslint:disable:no-string-literal */
    if (!this.resources.link) {
      return;
    }
    for (let link of this.resources.link) {
      if (CoRelType[link._rel] === 'SELF') {
        return link;
      }
    }
    return null;
    /* tslint:enable:no-string-literal */
  }

  public getUri():CaUri {
    let selfLink = this.getSelfLink();
    // TODO: make helper function
    let uri = '../../rest/';
    uri += selfLink._href;
    uri += '?$meta=true';

    let coLink:CoLink = new CaLink();
    coLink._rel = CoRelType.self;
    coLink._href = uri;
    let caUri = new CaUri(coLink);
    console.log('CaBaseMvcModel: getUri: ', uri);
    return caUri;
  }
}
