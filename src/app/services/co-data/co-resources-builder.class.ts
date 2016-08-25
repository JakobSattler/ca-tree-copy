import {CoDataConstants} from './co-data.model';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoResource} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';

export class CoResourcesBuilder<T extends CoContentDto> {

  private _contentType:string = CoDataConstants.CONTENT_TYPE_GENERIC;
  private _contentRoot:string = CoDataConstants.CONTENT_ROOT_GENERIC;
  private _dtoList:Array<T>;

  public contentType(contentType:string):CoResourcesBuilder<T> {
    this._contentType = contentType;
    return this;
  }

  public contentRoot(contentRoot:string):CoResourcesBuilder<T> {
    this._contentRoot = contentRoot;
    return this;
  }

  public dtoList(dtoList:Array<any>):CoResourcesBuilder<T> {
    this._dtoList = dtoList;
    return this;
  }

  public build():CoResources<T> {

    let resources:CoResources<T> = {
      resource: []
    };

    if (!this._dtoList) {
      return resources;
    }

    this._dtoList.forEach(dto => {

      let content:CoContentDto = {
        _type: this._contentType
      };

      content[this._contentRoot] = dto;

      // leider muss man hier auf any zurück greifen,
      // da in diesem Fall CoContentDto dynamisch erstellt wird
      let resource:CoResource<any> = {
        content: content
      };

      resources.resource.push(resource);
    });

    return resources;
  }
}
