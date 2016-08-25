"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var CaResourcesService = (function () {
    function CaResourcesService(caDataService) {
        this.caDataService = caDataService;
        //empty
    }
    CaResourcesService.prototype.fetchDataModel = function (model, uri) {
        var _this = this;
        if (!model && !uri) {
            return null;
        }
        if (!uri) {
            uri = model.getUri();
        }
        return Rx_1.Observable.create(function (observer) {
            _this.caDataService.get(uri).subscribe(function (resource) {
                observer.next(resource);
                observer.complete();
            }, function (err) {
                console.log('CaTableMvcService: an error occured during fetching');
            });
        });
    };
    CaResourcesService = __decorate([
        core_1.Injectable()
    ], CaResourcesService);
    return CaResourcesService;
}());
exports.CaResourcesService = CaResourcesService;
//# sourceMappingURL=ca-resources.service.js.map