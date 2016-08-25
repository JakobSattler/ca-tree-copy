import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, RequestMethod, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {CoDataServiceError, CaUriError} from './ca-data.error';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoLink} from '../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {HttpHeaderBuilder} from './http-header.builder';
import {CaAccessTokenService} from '../ca-access-token.service';
import {isPresent, isString} from '@angular/core/src/facade/lang';

/**
 * CaResponse holds every Information about the CoDataRequest and Response.
 * e.g. Header, Body, Status.
 * @see Response
 */
export class CaResponse<T extends CoContentDto> extends Response {
  public resources: CoResources<T>;
}

/**
 * Holds Information about uri to call.
 */
export class CaUri {
  public link: CoLink;
  public api: string;
  public resource: string;
  
  constructor(apiOrLink: CoLink|string, resource?: string) {
    if (apiOrLink) {
      if (typeof apiOrLink === 'object') {
        this.link = (<CoLink>apiOrLink);
      } else {
        this.api = apiOrLink.toString();
        this.resource = resource;
      }
    } else {
      throw new CaUriError('CaDataService: ParameterMismatch: Either api and resource or link must be declared.');
    }
  }
}

/**
 * @see https://angular.io/docs/ts/latest/api/http/Http-class.html
 */
@Injectable()
export class CaDataService<T extends CoContentDto> {
  constructor(public http: Http, private accessTokenService: CaAccessTokenService) {
    console.info('CaDataService -- CONSTRUCTOR.');
  }
  
  /**
   * TODO add server uri,
   */
  private toUri(link: CaUri): string {
    if (link) {
      if (link.link) {
        return link.link._href;
      } else if (link.api && link.resource) {
        return link.api + link.resource;
      }
    } else {
      throw new CoDataServiceError('CaDataService: ParameterMismatch: Either api and resource or link must be declared.');
    }
  }
  
  private extractData(res: Response): any {
    if (res.status < 200 || res.status >= 300) {
      console.info('Bad Response Status: ', res.status);
      throw new Error('Bad response status: ' + res.status);
    }
    
    let returnString: string;
    
    try {
      returnString = res.json();
      return returnString;
    } catch (err) {
      return {};
    }
    
  }
  
  private handleError(error: any): any {
    let errMsg = error.message || 'Server error';
    console.info('Error -- ', errMsg);
    return Observable.throw(errMsg);
  }
  
  private getModeltypeByResource(resources: CoResources<T>|string): string {
    try {
      if (typeof resources === 'object') {
        return (<CoResources<T>>resources).resource[0].content._type;
      } else {
        return resources.toString();
      }
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Performs a request with `get` http method.
   */
  public get(link: CaUri, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(link, RequestMethod.Get, null, options);
  }
  
  /**
   * Performs a request with `post` http method.
   */
  public post(link: CaUri, resources: CoResources<T>|string, options?: RequestOptionsArgs): Observable<CaResponse<T>> {
    return this._request(link, RequestMethod.Post, resources, options);
  }
  
  /**
   * Performs a request with `put` http method.
   */
  public put(link: CaUri, resources: CoResources<T>|string, options?: RequestOptionsArgs): Observable<CaResponse<T>> {
    return this._request(link, RequestMethod.Put, resources, options);
  }
  
  /**
   * Performs a request with `delete` http method.
   */
  public delete(link: CaUri, options?: RequestOptionsArgs): Observable<CaResponse<T>> {
    return this._request(link, RequestMethod.Delete, null, options);
  }
  
  /**
   * Performs a request with `get` http method.
   */
  public options(link: CaUri, options?: RequestOptionsArgs): Observable<Response> {
    return this._request(link, RequestMethod.Options, null, options);
  }
  
  public _request(link: CaUri, method: RequestMethod, resources?: CoResources<T>|string, options?: RequestOptionsArgs): Observable<CaResponse<T>> {
    let obs: any; //FIXME Observable<Response>;
    let body: string;
    let defaultHeaders: Headers = new HttpHeaderBuilder().build();
    let modeltype: string;
    
    // in case we got a CoResource Object
    if (resources instanceof Object) {
      modeltype = this.getModeltypeByResource(resources);
      body = JSON.stringify(resources);
    } else {
      body = <string>resources;
    }
    
    defaultHeaders = new HttpHeaderBuilder(defaultHeaders)
      .addAcceptJson()
      .addContentTypeModel(modeltype)
      .addBearer(this.accessTokenService.getToken())
      .build();
    
    let defaultOptions: RequestOptionsArgs = {
      method: method,
      headers: defaultHeaders,
      url: this.toUri(link),
      body: body
    };
    
    let mergedOptions = this.mergeRequestOptionsArgs(defaultOptions, options);
    obs = this.http.request(this.toUri(link), mergedOptions)
      .distinctUntilChanged()
      .map((response) => this.extractData(response))
      .share()
      .catch((error) => this.handleError(error));
    
    return obs; //(Observable<CaResponse<T>><any>obs);
  }
  
  mergeRequestOptionsArgs(defaultOptions: RequestOptionsArgs, options: RequestOptionsArgs): RequestOptionsArgs {
    if (!defaultOptions) {
      return options;
    }
    if (!options) {
      return defaultOptions;
    }
    
    return <RequestOptionsArgs>{
      url: isPresent(options.url) ? options.url : defaultOptions.url,
      method: isPresent(options.method) ? options.method : defaultOptions.method,
      search: isPresent(options.search) ?
        (isString(options.search) ? new URLSearchParams(<string>(options.search)) :
          (<URLSearchParams>(options.search)).clone()) :
        defaultOptions.search,
      headers: this.mergeHeaders(options.headers, defaultOptions.headers),
      body: isPresent(options.body) ? options.body : defaultOptions.body,
      withCredentials: isPresent(options.withCredentials) ?
        options.withCredentials :
        defaultOptions.withCredentials
    };
  }
  
  mergeHeaders(defaultHeaders: Headers, headers: Headers): Headers {
    return new Headers(Object.assign({}, defaultHeaders.toJSON(), headers.toJSON()));
  }
}
