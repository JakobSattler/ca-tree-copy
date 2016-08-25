import {CoDataConstants} from './co-data.model';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';

export class CoResourcesInfo<T extends CoContentDto> {

  constructor(private resources:CoResources<T>) {
  }

  public countResources():number {
    return this.resources.resource.length;
  }

  public getFirstContent():T {
    if (this.resources.resource.length > 0) {
      return this.resources.resource[0].content;
    }

    return null;
  }

  public getAllContent():Array<T> {
    let contentArray = Array<T>();
    if (this.countResources() === 0) {
      return null;
    }

    for (let resource of this.resources.resource) {
      contentArray.push(resource.content);
    }

    return contentArray;
  }

  public getContentType():string {
    let firstContent:T = this.getFirstContent();

    if (!firstContent) {
      return CoDataConstants.CONTENT_TYPE_GENERIC;
    }

    return firstContent._type;
  }

  public getContentRoot():string {

    let firstContent:T = this.getFirstContent();

    if (!firstContent) {
      return CoDataConstants.CONTENT_ROOT_GENERIC;
    }

    let keys:Array<string> = Object.keys(firstContent);

    if (keys.length !== 2) {
      throw new TypeError('no valid codata content-resource');
    }

    //FIXME: this is not deterministic!!! -> maybe just using 'data' as contentRoot?
    return keys[1];
  }

  public getFirstDto():T {
    let contentRoot:string = this.getContentRoot();

    if (contentRoot !== CoDataConstants.CONTENT_ROOT_GENERIC) {
      return this.resources.resource[0].content[contentRoot];
    }

    return null;
  }

  public getContentKeys():Array<string> {
    //let dto:T = this.getFirstDto();
    let contentRoot:string = this.getContentRoot();
    //if (dto) {
//      return Object.keys(dto);
    //  }

    let allKeys:Array<string> = [];
    let found:boolean = false;

    for (let row of this.resources.resource) {
      for (let oneKey of Object.keys(row.content[contentRoot])) {

        found = false;
        for (let alreadyThereKey of allKeys) {
          if (alreadyThereKey === oneKey) {
            found = true;
          }
        }
        if (!found) {
          allKeys.push(oneKey);
        }
      }
    }

    return allKeys;
  }

}
