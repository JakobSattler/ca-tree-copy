"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_service_1 = require('../../services/ca-tree.service');
var model_1 = require('../../dto/at/campusonline/core/lib/model/codata/annotation/link/model');
var co_data_model_1 = require('../../services/co-data/co-data.model');
var ca_data_service_1 = require('../../services/co-data/ca-data.service');
var ca_resources_service_1 = require('../../services/co-resources-service/ca-resources.service');
var ca_access_token_service_1 = require('../../services/ca-access-token.service');
var ca_tree_mvc_service_1 = require('../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc.service');
//import * as _ from 'lodash';
var CaTreeComponent = (function () {
    //tableModelBuilder: CaTableMvcModelBuilder<CoContentDto> = new CaTableMvcModelBuilder<CoContentDto>();
    //localModel: CaTableMvcModel;
    function CaTreeComponent(_caResourcesService) {
        this._caResourcesService = _caResourcesService;
        this.restUri = './organisations_flat.json';
    }
    CaTreeComponent.prototype.ngOnInit = function () {
        var coLink = new co_data_model_1.CaLink();
        coLink._rel = model_1.CoRelType.self;
        coLink._href = this.restUri;
        var caUri = new ca_data_service_1.CaUri(coLink);
        this._caResourcesService.init(caUri).subscribe(function (resources) {
            console.log(resources);
        });
        return null;
    };
    CaTreeComponent.prototype.onNodeSelected = function (node) {
        node.selected = !node.selected;
        //this.model.checkChildren(node);
    };
    CaTreeComponent.prototype.onNodeExtended = function (node) {
        this.loadChildren(node);
        node.extended = !node.extended;
    };
    CaTreeComponent.prototype.loadChildren = function (node) {
        //load children + next level to load proper icon
        //  this.caTreeService.getNodes().subscribe(
        //    (data: any) => {
        //      for (let d1 of data.filter(res => res.parentNr === node.nr)) {
        //        if (!this.model.containsNode(d1)) {
        //          this.model.resources.push(d1);
        //        }
        //        for (let d2 of data.filter(res => res.parentNr === d1.nr)) {
        //          if (!this.model.containsNode(d2)) {
        //            this.model.resources.push(d2);
        //          }
        //        }
        //      }
        //    }
        //  )
    };
    CaTreeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree',
            templateUrl: 'ca-tree.component.html',
            //directives: [CaTreeNodeComponent],
            providers: [ca_tree_service_1.CaTreeService, ca_resources_service_1.CaResourcesService, ca_data_service_1.CaDataService, ca_access_token_service_1.CaAccessTokenService, ca_tree_mvc_service_1.CaTreeMvcService],
            styles: ["\n    div {\n      padding-left: 10px;\n    }\n  "]
        })
    ], CaTreeComponent);
    return CaTreeComponent;
}());
exports.CaTreeComponent = CaTreeComponent;
//# sourceMappingURL=ca-tree.component.js.map