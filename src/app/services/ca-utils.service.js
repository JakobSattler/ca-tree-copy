//import {Injectable} from '@angular/core';
////import * as _ from 'lodash';
//
//@Injectable()
//export class CaUtilsService {
//  public static clone(obj):Object {
//    if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) {
//      return obj;
//    }
//
//    let temp:Object = obj.constructor();
//    if (obj instanceof Date) {
//      temp = new obj.constructor(); //or new Date(obj);
//    }
//
//    for (let key in obj) {
//      if (Object.prototype.hasOwnProperty.call(obj, key)) {
//        /* tslint:disable:no-string-literal */
//        //obj['isActiveClone'] = null;
//        console.log('CaUtilsService cloning ', key);
//        console.log('CaUtilsService cloning ', obj[key]);
//        temp[key] = this.clone(obj[key]);
//
//        //delete obj['isActiveClone'];
//        /* tslint:enable:no-string-literal */
//
//      }
//    }
//    return temp;
//  }
//
//  public static deepCopy(obj): Object {
//    return _.cloneDeep(obj);
//  }
//}
//# sourceMappingURL=ca-utils.service.js.map