import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/Rx';

const STORAGE:any = localStorage || {
    getItem: function (key:string):string {
      return null;
    },
    removeItem: function (key:string):void {
      return;
    },
    setItem: function (token:string):void {
      return;
    }
  };

@Injectable()
export class CaAccessTokenService {

  token$:BehaviorSubject<string> = new BehaviorSubject<string>(null);

  static get TOKEN_NAME():string {
    return 'co.login.accessToken';
  }

  constructor() {
    let storedToken = STORAGE.getItem(CaAccessTokenService.TOKEN_NAME);
    console.log('CaAccessTokenService: Constructor: StoredToken:', localStorage.getItem('co.login.accessToken'));

    if (storedToken) {
      this.token$.next(storedToken);
    }
  }

  existsToken():boolean {
    return !!this.token$.getValue();
  }

  removeToken():void {
    STORAGE.removeItem(CaAccessTokenService.TOKEN_NAME);
    this.token$.next(null);
  }

  setToken(token:string):void {
    STORAGE.setItem(CaAccessTokenService.TOKEN_NAME, token);
    this.token$.next(token);
  }

  getToken():string {
    return this.token$.getValue();
  }

  getToken$():Observable<string> {
    return this.token$.asObservable();
  }
}
