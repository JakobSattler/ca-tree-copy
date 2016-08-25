"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var ca_data_error_1 = require('./ca-data.error');
var http_header_builder_1 = require('./http-header.builder');
var lang_1 = require('@angular/core/src/facade/lang');
/**
 * CaResponse holds every Information about the CoDataRequest and Response.
 * e.g. Header, Body, Status.
 * @see Response
 */
var CaResponse = (function (_super) {
    __extends(CaResponse, _super);
    function CaResponse() {
        _super.apply(this, arguments);
    }
    return CaResponse;
}(http_1.Response));
exports.CaResponse = CaResponse;
/**
 * Holds Information about uri to call.
 */
var CaUri = (function () {
    function CaUri(apiOrLink, resource) {
        if (apiOrLink) {
            if (typeof apiOrLink === 'object') {
                this.link = apiOrLink;
            }
            else {
                this.api = apiOrLink.toString();
                this.resource = resource;
            }
        }
        else {
            throw new ca_data_error_1.CaUriError('CaDataService: ParameterMismatch: Either api and resource or link must be declared.');
        }
    }
    return CaUri;
}());
exports.CaUri = CaUri;
/**
 * @see https://angular.io/docs/ts/latest/api/http/Http-class.html
 */
var CaDataService = (function () {
    function CaDataService(http, accessTokenService) {
        this.http = http;
        this.accessTokenService = accessTokenService;
        console.info('CaDataService -- CONSTRUCTOR.');
    }
    /**
     * TODO add server uri,
     */
    CaDataService.prototype.toUri = function (link) {
        if (link) {
            if (link.link) {
                return link.link._href;
            }
            else if (link.api && link.resource) {
                return link.api + link.resource;
            }
        }
        else {
            throw new ca_data_error_1.CoDataServiceError('CaDataService: ParameterMismatch: Either api and resource or link must be declared.');
        }
    };
    CaDataService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            console.info('Bad Response Status: ', res.status);
            throw new Error('Bad response status: ' + res.status);
        }
        var returnString;
        try {
            returnString = res.json();
            return returnString;
        }
        catch (err) {
            return {};
        }
    };
    CaDataService.prototype.handleError = function (error) {
        var errMsg = error.message || 'Server error';
        console.info('Error -- ', errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CaDataService.prototype.getModeltypeByResource = function (resources) {
        try {
            if (typeof resources === 'object') {
                return resources.resource[0].content._type;
            }
            else {
                return resources.toString();
            }
        }
        catch (err) {
            return null;
        }
    };
    /**
     * Performs a request with `get` http method.
     */
    CaDataService.prototype.get = function (link, options) {
        return this._request(link, http_1.RequestMethod.Get, null, options);
    };
    /**
     * Performs a request with `post` http method.
     */
    CaDataService.prototype.post = function (link, resources, options) {
        return this._request(link, http_1.RequestMethod.Post, resources, options);
    };
    /**
     * Performs a request with `put` http method.
     */
    CaDataService.prototype.put = function (link, resources, options) {
        return this._request(link, http_1.RequestMethod.Put, resources, options);
    };
    /**
     * Performs a request with `delete` http method.
     */
    CaDataService.prototype.delete = function (link, options) {
        return this._request(link, http_1.RequestMethod.Delete, null, options);
    };
    /**
     * Performs a request with `get` http method.
     */
    CaDataService.prototype.options = function (link, options) {
        return this._request(link, http_1.RequestMethod.Options, null, options);
    };
    CaDataService.prototype._request = function (link, method, resources, options) {
        var _this = this;
        var obs; //FIXME Observable<Response>;
        var body;
        var defaultHeaders = new http_header_builder_1.HttpHeaderBuilder().build();
        var modeltype;
        // in case we got a CoResource Object
        if (resources instanceof Object) {
            modeltype = this.getModeltypeByResource(resources);
            body = JSON.stringify(resources);
        }
        else {
            body = resources;
        }
        defaultHeaders = new http_header_builder_1.HttpHeaderBuilder(defaultHeaders)
            .addAcceptJson()
            .addContentTypeModel(modeltype)
            .addBearer(this.accessTokenService.getToken())
            .build();
        var defaultOptions = {
            method: method,
            headers: defaultHeaders,
            url: this.toUri(link),
            body: body
        };
        var mergedOptions = this.mergeRequestOptionsArgs(defaultOptions, options);
        obs = this.http.request(this.toUri(link), mergedOptions)
            .distinctUntilChanged()
            .map(function (response) { return _this.extractData(response); })
            .share()
            .catch(function (error) { return _this.handleError(error); });
        return obs; //(Observable<CaResponse<T>><any>obs);
    };
    CaDataService.prototype.mergeRequestOptionsArgs = function (defaultOptions, options) {
        if (!defaultOptions) {
            return options;
        }
        if (!options) {
            return defaultOptions;
        }
        return {
            url: lang_1.isPresent(options.url) ? options.url : defaultOptions.url,
            method: lang_1.isPresent(options.method) ? options.method : defaultOptions.method,
            search: lang_1.isPresent(options.search) ?
                (lang_1.isString(options.search) ? new http_1.URLSearchParams((options.search)) :
                    (options.search).clone()) :
                defaultOptions.search,
            headers: this.mergeHeaders(options.headers, defaultOptions.headers),
            body: lang_1.isPresent(options.body) ? options.body : defaultOptions.body,
            withCredentials: lang_1.isPresent(options.withCredentials) ?
                options.withCredentials :
                defaultOptions.withCredentials
        };
    };
    CaDataService.prototype.mergeHeaders = function (defaultHeaders, headers) {
        return new http_1.Headers(Object.assign({}, defaultHeaders.toJSON(), headers.toJSON()));
    };
    CaDataService = __decorate([
        core_1.Injectable()
    ], CaDataService);
    return CaDataService;
}());
exports.CaDataService = CaDataService;
//# sourceMappingURL=ca-data.service.js.map