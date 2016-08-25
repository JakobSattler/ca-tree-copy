import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {CaTreeComponent} from '../components/ca-tree/ca-tree.component';

/**
 * Used to get data using HTTP and to (un)check nodes
 */
@Injectable()
export class CaTreeService {

  caTreeComponent: CaTreeComponent;

  constructor(private http: Http) {
  }

  getNodes(): Observable<any> {
    return this.http.get('./organisations_flat.json').map(res => res.json());
  }
}
