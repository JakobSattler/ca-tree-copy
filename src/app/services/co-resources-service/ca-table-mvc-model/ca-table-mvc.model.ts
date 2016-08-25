//import {CaBaseMvcModel} from '../ca-base-mvc.model';
//import {CoContentDto, CoMetaDto} from '../../../dto/at/campusonline/core/lib/model/codata/model';
//import {CoResources} from '../../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
//import {TableMvcDto} from '../../../dto/at/campusonline/core/lib/model/meta/ui/v1/view/model';
//import {TableColDto} from '../../../dto/at/campusonline/core/lib/model/meta/ui/v1/view/container/model';
//import {FilterItemDto} from '../../../dto/at/campusonline/core/lib/model/meta/ui/v1/view/input/model';
//import {CaUri} from '../../co-data/ca-data.service';
//import {FilterOperatorType} from '../../../dto/at/campusonline/core/lib/model/meta/db/base/v1/model';
//import {CoLink} from '../../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
//import {CaLink} from '../../co-data/co-data.model';
//import {CoRelType} from '../../../dto/at/campusonline/core/lib/model/codata/annotation/link/model';
//import {Direction} from '../../../dto/at/campusonline/core/lib/model/meta/db/query/v2/model';
//import {CaFilterOperatorsService} from '../../../components/ca-filter/ca-filter-operators.service';
//import {CoResourcesInfo} from '../../co-data/co-resources-info.class';
//
//export interface FilterItem extends CoMetaDto {
//  input?:FilterInput;
//}
//
//export interface FilterInput {
//  value?:string;
//  _field?:string;
//  _fieldType?:string;
//  _label?:string;
//  _operator?:string;
//  _readonly?:boolean;
//  _required?:boolean;
//  _type?:string;
//}
//
//export interface FilterParameter {
//  field:string;
//  operator:string;
//  value:string;
//}
//
//export interface SortParameter {
//  field:string;
//  direction:string;
//}
//
//export class CaTableMvcModel extends CaBaseMvcModel {
//  resources:CoResources<CoContentDto>;
//  tableMvc:TableMvcDto;
//
//  constructor() {
//    super();
//    this.resources = {};
//    this.resources.meta = new Array<CoMetaDto>();
//    (<any>this.resources.meta).usecase = new Array<any>();
//    let tableMvc:TableMvcDto = {
//      cols: {
//        col: new Array<TableColDto>()
//      }
//    };
//    this.resources.resource = new Array<CoContentDto>();
//    this.tableMvc = tableMvc;
//  }
//
//  getTableMvcColumns():Array<TableColDto> {
//    return this.tableMvc.cols.col;
//  }
//  public getKeys():Array<string> {
//    let keys:Array<string> = new Array<string>();
//    for (let key of new CoResourcesInfo<CoContentDto>(this.resources).getContentKeys()) {
//      if (this.getColumnByField(key)) {
//        keys.push(key);
//      }
//
//    }
//    return keys;
//  }
//
//  getFieldsByColumns():Array<string> {
//    let keys:Array<string> = new Array<string>();
//    for (let column of this.getTableMvcColumns()) {
//      keys.push(column._field);
//    }
//    return keys;
//  }
//
//  getColumnByField(field:string):TableColDto {
//    console.log('CaTableMvcModel getColumnByField', this.tableMvc.cols.col);
//    for (let column of this.tableMvc.cols.col) {
//      if (column._field === field) {
//        return column;
//      }
//    }
//    return null;
//  }
//
//  setSortForColumn(field:string, sortingDirection:Direction):void {
//    let column = this.getColumnByField(field);
//    if (!column) {
//      return;
//    }
//    if (!column.sort) {
//      column.sort = {};
//    }
//    column.sort._allowed = true;
//    column.sort.active = sortingDirection;
//  }
//
//  sortTable(column:TableColDto):void {
//    let col = this.getColumnByField(column._field);
//    this.resetSortingForOtherColumns(col);
//    if (col.sort) {
//      if (col.sort.active === Direction.ASC) {
//        col.sort.active = Direction.DESC;
//      } else {
//        col.sort.active = Direction.ASC;
//      }
//    }
//  }
//
//  resetSortingForOtherColumns(column:TableColDto):void {
//    for (let col of this.tableMvc.cols.col) {
//      if (col._field !== column._field && col.sort) {
//        col.sort.active = undefined;
//      }
//    }
//  }
//
//  filterTable(filterTerm:string, column:TableColDto):void {
//    console.log('ca-table.model: filter column: ' + column + ' filterTerm: ', filterTerm);
//    for (let col of this.tableMvc.cols.col) {
//      if (col._field === column._field) {
//        if (!col.filter.filterItem) {
//          col.filter.filterItem = new Array<FilterItem>();
//          col.filter.filterItem.push(<FilterItemDto>{
//            input: {
//              value: filterTerm
//            }
//          });
//        } else {
//          (<FilterItem>col.filter.filterItem[0]).input.value = filterTerm;
//        }
//      }
//    }
//  }
//
//  getFilterParamter():Array<FilterParameter> {
//    let filterParams = new Array<FilterParameter>();
//    for (let col of this.tableMvc.cols.col) {
//      if ((<TableColDto>col).filter) {
//        //TODO: iterate over all filter
//        let filterItem = (<TableColDto>col).filter.filterItem[0];
//        if (filterItem && (<FilterItem>filterItem).input && (<FilterItem>filterItem).input.value) {
//          filterParams.push({
//            field: (<TableColDto>col)._field,
//            operator: (<FilterItem>filterItem).input._operator,
//            value: (<FilterItem>filterItem).input.value
//          });
//        }
//      }
//    }
//    return filterParams;
//  }
//
//  getSortParameters():Array<SortParameter> {
//    let sortParameters = new Array<SortParameter>();
//    for (let col of this.tableMvc.cols.col) {
//      if (col.sort && col.sort.active !== undefined) {
//        console.log('CaTableModel getSortParameter ', col);
//        sortParameters.push({
//          field: (<TableColDto>col)._field,
//          direction: Direction[(<TableColDto>col).sort.active]
//        });
//      }
//    }
//
//    return sortParameters;
//  }
//
//  getUri():CaUri {
//    let selfLink = this.getSelfLink();
//    if (!selfLink) {
//      return;
//    }
//    // TODO: make helper function
//    let uri = '../../rest/';
//    uri += selfLink._href;
//    uri += '?$meta=true';
//    let first = true;
//    let filterParameters = this.getFilterParamter();
//    if (filterParameters) {
//      uri += '&$filter=';
//      for (let filterParameter of filterParameters) {
//        if (!first) {
//          uri += ';';
//        }
//        uri += filterParameter.field + '-' + CaFilterOperatorsService.getUrlFilterParameter(FilterOperatorType[filterParameter.operator])
//          + '=' + filterParameter.value;
//        first = false;
//      }
//    }
//    let sortParameters = this.getSortParameters();
//    if (sortParameters.length > 0) {
//      uri += '&$orderBy=';
//      for (let sortParameter of sortParameters) {
//        uri += sortParameter.field + '=' + sortParameter.direction;
//      }
//    }
//    let coLink:CoLink = new CaLink();
//    coLink._rel = CoRelType.self;
//    coLink._href = uri;
//    let caUri = new CaUri(coLink);
//    console.log('CaTableModel: getUri: ', uri);
//    return caUri;
//  }
//}
