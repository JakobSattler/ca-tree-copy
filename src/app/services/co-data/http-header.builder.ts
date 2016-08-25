import {Headers} from '@angular/http';

export class HttpHeaderBuilder {

  headers:Headers;

  constructor(headers?:Headers) {
    this.headers = headers ? headers : new Headers();
  }

  addBearer(token:string):HttpHeaderBuilder {
    if (token) {
      this.headers.append('Authorization', 'Bearer ' + token);
    }
    return this;
  }

  addContentType():HttpHeaderBuilder {
    this.headers.append('Content-Type', 'application/json');
    return this;
  }

  addContentTypeModel(modeltype:string):HttpHeaderBuilder {
    if (modeltype) {
      this.headers.append('Content-Type', 'application/json;model=' + modeltype);
    } else {
      this.headers.append('Content-Type', 'application/json');
    }
    return this;
  }

  addAcceptJson():HttpHeaderBuilder {
    this.headers.append('Accept', 'application/json');
    return this;
  }

  build():Headers {
    return this.headers;
  }

}
