"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_node_component_1 = require('./ca-tree-node/ca-tree-node.component');
var ca_data_service_1 = require('../../../../../core/lib/services/co-data/ca-data.service');
var ca_tree_mvc_model_1 = require('../services/ca-tree-mvc-model/ca-tree-mvc-model');
var ca_tree_mvc_model_builder_1 = require('../services/ca-tree-mvc-model/ca-tree-mvc-model.builder');
var co_data_model_1 = require('../../../../../core/lib/services/co-data/co-data.model');
var model_1 = require('../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/annotation/link/model');
//import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
//import * as _ from 'lodash';
var CaTreeComponent = (function () {
    function CaTreeComponent(_caTreeMvcService) {
        this._caTreeMvcService = _caTreeMvcService;
        this.restUri = 'https://api.myjson.com/bins/3j35s';
        this.treeModelBuilder = new ca_tree_mvc_model_builder_1.CaTreeMvcModelBuilder();
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._caTreeMvcService.caTreeComponent = this;
        var coLink = new co_data_model_1.CaLink();
        coLink._rel = model_1.CoRelType.self;
        coLink._href = this.restUri;
        this.caUri = new ca_data_service_1.CaUri(coLink);
        this._caTreeMvcService.init(this.caUri).subscribe(function (resources) {
            var _loop_1 = function(d1) {
                _this.treeModelBuilder.addResource(d1);
                for (var _i = 0, _a = resources.resource.filter(function (res) { return res.content.parentNr === d1.content.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    _this.treeModelBuilder.addResource(d2);
                }
            };
            for (var _b = 0, _c = resources.resource.filter(function (res) { return !res.content.parentNr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_1(d1);
            }
            _this.localModel = _this.treeModelBuilder.build();
        });
        //this._caTreeMvcService.updateNode(this.caUri, 706544, 'Gstörter Hund');
        return null;
    };
    CaTreeComponent.prototype.onAction = function (action) {
        //this._caTreeMvcService.dispatchAction(action).subscribe((resources: CoResources<BasicTreeNode>) => {
        //  console.log('onAction');
        //  this.localModel = this.treeModelBuilder.addResources(resources.resource).build();
        //});
    };
    CaTreeComponent.prototype.onNodeSelected = function (node) {
        console.log('selected');
        console.log(node);
        console.log(node.selected);
        node.selected = !node.selected;
        console.log(node.selected);
        this.localModel.checkChildren(node);
    };
    CaTreeComponent.prototype.onNodeExtended = function (node) {
        this.loadChildren(node);
        node.extended = !node.extended;
    };
    CaTreeComponent.prototype.loadChildren = function (node) {
        var _this = this;
        //load children + next level to load proper icon
        this._caTreeMvcService.init(this.caUri).subscribe(function (resources) {
            var _loop_2 = function(d1) {
                if (!_this.localModel.containsNode(d1.content)) {
                    _this.treeModelBuilder.addResource(d1);
                }
                for (var _i = 0, _a = resources.resource.filter(function (res) { return res.content.parentNr === d1.content.nr; }); _i < _a.length; _i++) {
                    var d2 = _a[_i];
                    if (!_this.localModel.containsNode(d2.content)) {
                        _this.treeModelBuilder.addResource(d2);
                    }
                }
            };
            for (var _b = 0, _c = resources.resource.filter(function (res) { return res.content.parentNr === node.nr; }); _b < _c.length; _b++) {
                var d1 = _c[_b];
                _loop_2(d1);
            }
            _this.localModel = _this.treeModelBuilder.build();
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
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "],
            pipes: [ca_tree_mvc_model_1.NodeFilter]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map