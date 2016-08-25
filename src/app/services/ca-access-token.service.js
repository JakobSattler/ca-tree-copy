"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var STORAGE = localStorage || {
    getItem: function (key) {
        return null;
    },
    removeItem: function (key) {
        return;
    },
    setItem: function (token) {
        return;
    }
};
var CaAccessTokenService = (function () {
    function CaAccessTokenService() {
        this.token$ = new Rx_1.BehaviorSubject(null);
        var storedToken = STORAGE.getItem(CaAccessTokenService.TOKEN_NAME);
        console.log('CaAccessTokenService: Constructor: StoredToken:', localStorage.getItem('co.login.accessToken'));
        if (storedToken) {
            this.token$.next(storedToken);
        }
    }
    Object.defineProperty(CaAccessTokenService, "TOKEN_NAME", {
        get: function () {
            return 'co.login.accessToken';
        },
        enumerable: true,
        configurable: true
    });
    CaAccessTokenService.prototype.existsToken = function () {
        return !!this.token$.getValue();
    };
    CaAccessTokenService.prototype.removeToken = function () {
        STORAGE.removeItem(CaAccessTokenService.TOKEN_NAME);
        this.token$.next(null);
    };
    CaAccessTokenService.prototype.setToken = function (token) {
        STORAGE.setItem(CaAccessTokenService.TOKEN_NAME, token);
        this.token$.next(token);
    };
    CaAccessTokenService.prototype.getToken = function () {
        return this.token$.getValue();
    };
    CaAccessTokenService.prototype.getToken$ = function () {
        return this.token$.asObservable();
    };
    CaAccessTokenService = __decorate([
        core_1.Injectable()
    ], CaAccessTokenService);
    return CaAccessTokenService;
}());
exports.CaAccessTokenService = CaAccessTokenService;
//# sourceMappingURL=ca-access-token.service.js.map