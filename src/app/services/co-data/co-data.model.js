"use strict";
var co_resources_info_class_1 = require('./co-resources-info.class');
var ca_data_service_1 = require('./ca-data.service');
var CoDataConstants = (function () {
    function CoDataConstants() {
    }
    Object.defineProperty(CoDataConstants, "CONTENT_TYPE_GENERIC", {
        get: function () {
            return 'model-generic';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CoDataConstants, "CONTENT_ROOT_GENERIC", {
        get: function () {
            return 'generic';
        },
        enumerable: true,
        configurable: true
    });
    return CoDataConstants;
}());
exports.CoDataConstants = CoDataConstants;
var CaDataModel = (function () {
    /**
     *fetch first time data with included meta, data, -> cache meta data, reuse,
     * on meta is null, fetch with metadata
     * private meta:CoResourceMetaDto
     */
    // TODO on restApi and restResource, get right links for put and delete
    // TODO retrieve server url.
    function CaDataModel(ds) {
        this.ds = ds;
        //console.log('CoDataModel: %o', this.info.getContentKeys());
    }
    CaDataModel.prototype.next = function () {
        var _this = this;
        return this.ds.get(new ca_data_service_1.CaUri(this.restApi, this.restResource)).map(function (resp) { return _this.map(resp); });
    };
    //get():Observable<CaResponse<T>> ;
    //get(link:CoLink):Observable<CaResponse<T>> ;
    /**
     * Initial load, after response received, set correct Endpoint Information to use in model. (e.g. restApi, restResource,
     * links -> put... delete)
     * @param restApi
     * @param restResource
     * @returns {Observable<R>}
     */
    //get(api:string, resource:string):Observable<CaResponse<T>> ;
    CaDataModel.prototype.get = function (link, resource) {
        var _this = this;
        return this.ds.get(new ca_data_service_1.CaUri(link, resource)).map(function (resp) { return _this.map(resp); });
    };
    CaDataModel.prototype.post = function () {
        var _this = this;
        return this.ds.post(new ca_data_service_1.CaUri(this.restApi, this.restResource), this.resources).map(function (resp) { return _this.map(resp); });
    };
    /**
     * take restApi and uri from member -> initially loaded
     * @returns {Observable<R>}
     */
    CaDataModel.prototype.put = function () {
        var _this = this;
        return this.ds.put(new ca_data_service_1.CaUri(this.restApi, this.restResource), this.resources).map(function (resp) { return _this.map(resp); });
    };
    /**
     * take restApi and uri from member -> initially loaded
     * @returns {Observable<R>}
     */
    CaDataModel.prototype.delete = function () {
        var _this = this;
        return this.ds.delete(new ca_data_service_1.CaUri(this.restApi, this.restResource)).map(function (resp) { return _this.map(resp); });
    };
    CaDataModel.prototype.map = function (resp) {
        this.response = resp;
        //this.resources = resp.resources;
        this.info = new co_resources_info_class_1.CoResourcesInfo(resp.resources);
        //console.log('RESPONSE: %o', resp);
        //this.response = resp;
        //this.resources = resp['resource'];
        //console.log(this.resources);
        //this.info = new CoResourcesInfo<T>(resp.resources);
        //return this.response;
    };
    return CaDataModel;
}());
exports.CaDataModel = CaDataModel;
var CaLinkFinder = (function () {
    function CaLinkFinder(links) {
        this.links = links;
    }
    /**
     * Returns array of CoLinks filtered by key
     * @param key the key to search, self defined
     * @returns {Array<CoLink>} filtered links
     */
    CaLinkFinder.prototype.get = function (rel, key, type) {
        var linksToReturn;
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var link = _a[_i];
            if (rel) {
                if (key && type) {
                    if (link._rel === rel && link._key === key && link._type === type) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
                else if (key) {
                    if (link._rel === rel && link._key === key) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
                else {
                    if (link._rel === rel) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
            }
            else if (key) {
                if (type) {
                    if (link._key === key && link._type === type) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
                else {
                    if (link._key === key) {
                        this.addLink(linksToReturn, link);
                        continue;
                    }
                }
            }
            else if (type) {
                if (link._type === type) {
                    this.addLink(linksToReturn, link);
                    continue;
                }
            }
            else {
                // return all on no parameter
                return this.links;
            }
        }
        return linksToReturn;
    };
    CaLinkFinder.prototype.addLink = function (linksToReturn, link) {
        linksToReturn.push(link);
    };
    ;
    return CaLinkFinder;
}());
exports.CaLinkFinder = CaLinkFinder;
var CaLink = (function () {
    function CaLink() {
    }
    return CaLink;
}());
exports.CaLink = CaLink;
//# sourceMappingURL=co-data.model.js.map