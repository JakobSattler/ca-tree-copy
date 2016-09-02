import {CoContentDto} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/model';
import {CoResource} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoLink} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CaTreeMvcModel} from './ca-tree-mvc-model';

export class CaTreeMvcModelBuilder<T extends CoContentDto> {

  model: CaTreeMvcModel;

  constructor() {
    this.model = new CaTreeMvcModel();
  }

  addResource(resource: CoResource<T>): CaTreeMvcModelBuilder<T> {
    this.model.resources.resource.push(resource);
    return this;
  }

  addResources(resources: Array<CoResource<T>>): CaTreeMvcModelBuilder<T> {
    this.model.resources.resource = resources;
    return this;
  }

  addLinks(links: Array<CoLink>): CaTreeMvcModelBuilder<T> {
    (<any>this.model.resources).link = links;
    return this;
  }

  build(): CaTreeMvcModel {
    return this.model;
  }
}
