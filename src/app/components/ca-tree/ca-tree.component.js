"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../services/ca-tree.service');
//import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
var ca_tree_mvc_model_1 = require('../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model');
var model_1 = require('../../dto/at/campusonline/core/lib/model/codata/annotation/link/model');
var co_data_model_1 = require('../../services/co-data/co-data.model');
var ca_data_service_1 = require('../../services/co-data/ca-data.service');
var ca_resources_service_1 = require('../../services/co-resources-service/ca-resources.service');
var ca_access_token_service_1 = require('../../services/ca-access-token.service');
var ca_tree_mvc_service_1 = require('../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc.service');
var ca_tree_mvc_model_2 = require('../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model');
var ca_tree_node_component_1 = require('./ca-tree-node/ca-tree-node.component');
//import * as _ from 'lodash';
var CaTreeComponent = (function () {
    function CaTreeComponent(_caResourcesService, _caTreeService) {
        this._caResourcesService = _caResourcesService;
        this._caTreeService = _caTreeService;
        this.restUri = './organisations_flat_copy.json';
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._caTreeService.caTreeComponent = this;
        var coLink = new co_data_model_1.CaLink();
        coLink._rel = model_1.CoRelType.self;
        coLink._href = this.restUri;
        this.caUri = new ca_data_service_1.CaUri(coLink);
        this.model = new ca_tree_mvc_model_1.CaTreeMvcModel();
        this._caResourcesService.init(this.caUri).subscribe(function (resources) {
            var _loop_1 = function(d1) {
                _this.model.resources.resource.push(d1);
                for (var _i = 0, _a = resources.resource.filter(function (res) { return res.content.parentNr
                    === d1.content.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    _this.model.resources.resource.push(d2);
                }
            };
            for (var _b = 0, _c = resources.resource.filter(function (res) { return !res.content.parentNr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_1(d1);
            }
        });
    };
    CaTreeComponent.prototype.onNodeSelected = function (node) {
        node.selected = !node.selected;
        this.model.checkChildren(node);
    };
    CaTreeComponent.prototype.onNodeExtended = function (node) {
        this._loadChildren(node);
        node.extended = !node.extended;
    };
    CaTreeComponent.prototype._loadChildren = function (node) {
        var _this = this;
        //load children + next level to load proper icon
        this._caResourcesService.init(this.caUri).subscribe(function (resources) {
            var _loop_2 = function(d1) {
                if (!_this.model.containsNode(d1.content)) {
                    _this.model.resources.resource.push(d1);
                }
                for (var _i = 0, _a = resources.resource.filter(function (res) { return res.content.parentNr === d1.content.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    if (!_this.model.containsNode(d2.content)) {
                        _this.model.resources.resource.push(d2);
                    }
                }
            };
            for (var _b = 0, _c = resources.resource.filter(function (res) { return res.content.parentNr === node.nr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_2(d1);
            }
        });
    };
    __decorate([
        core_1.Input()
    ], CaTreeComponent.prototype, "selectable");
    __decorate([
        core_1.Input()
    ], CaTreeComponent.prototype, "editable");
    CaTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree',
            templateUrl: 'ca-tree.component.html',
            directives: [ca_tree_node_component_1.CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService, ca_resources_service_1.CaResourcesService, ca_data_service_1.CaDataService, ca_access_token_service_1.CaAccessTokenService, ca_tree_mvc_service_1.CaTreeMvcService],
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "],
            pipes: [ca_tree_mvc_model_2.NodeFilter]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map