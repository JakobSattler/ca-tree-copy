////import {CaTableMvcModel} from './ca-table-mvc.model';
//import {CoContentDto, CoMetaDto} from '../../../dto/at/campusonline/core/lib/model/codata/model';
//import {CoResource} from '../../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
//import {UsecaseType, UseCaseDto} from '../../../dto/at/campusonline/core/lib/model/meta/ui/v1/model';
//import {CoLink} from '../../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
//import {TableMvcDto} from '../../../dto/at/campusonline/core/lib/model/meta/ui/v1/view/model';
//import {CaTreeMvcModel} from './ca-tree-mvc-model';
//
//export class CaTreeMvcModelBuilder<T extends CoContentDto> {
//
//  model: CaTreeMvcModel;
//
//  constructor() {
//    this.model = new CaTreeMvcModel();
//  }
//
//  addResource(content: T): CaTreeMvcModelBuilder<T> {
//    this.model.resources.resource.push({content: content});
//    return this;
//  }
//
//  addResources(resources: Array<CoResource<T>>): CaTreeMvcModelBuilder<T> {
//    this.model.resources.resource = resources;
//    return this;
//  }
//
//  addLinks(links: Array<CoLink>): CaTreeMvcModelBuilder<T> {
//    (<any>this.model.resources).link = links;
//    return this;
//  }
//
//  addMetadata(meta: CoMetaDto, usecase: UsecaseType = UsecaseType.TABLE, id: string = ''): CaTreeMvcModelBuilder<T> {
//    if (!meta) {
//      return this;
//    }
//    for (let uc of (<any>meta).usecase) {
//      if ((<UseCaseDto>uc)._type === usecase && id === '') {
//        //this.model.tableMvc = uc.tableMvc[0];
//        return this;
//      }
//      if ((<UseCaseDto>uc)._type === usecase && id === id) {
//        //this.model.tableMvc = uc.tableMvc[0];
//        return this;
//      }
//    }
//    return this;
//  }
//
//  addTableMvc(tableMvc: TableMvcDto): CaTreeMvcModelBuilder<T> {
//    //this.model.tableMvc = tableMvc;
//    return this;
//  }
//
//  build(): CaTableMvcModel {
//    return this.model;
//  }
//}
