"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_mvc_model_1 = require('../../services/ca-tree-mvc-model/ca-tree-mvc-model');
//import {CoLink} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/link/dto/model';
//import {CoRelType} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/annotation/link/model';
//import {CaLink} from '../../../../../../core/lib/services/co-data/co-data.model';
//import {CoResources} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
var ca_resources_action_1 = require('../../../../../../core/lib/services/co-resources-service/ca-resources.action');
var actions = require('../../services/ca-tree-mvc-model/ca-tree-actions');
//import {CoResources} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
var CaTreeNodeComponent = (function () {
    function CaTreeNodeComponent(_caTreeMvcService, _caDataService) {
        this._caTreeMvcService = _caTreeMvcService;
        this._caDataService = _caDataService;
        this.paddingPerLevel = 10;
        this.imgURLClose = 'http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-44945-128px.png';
        this.imgURLOpen = 'https://freeiconshop.com/files/edd/folder-open-solid.png';
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeExtended = new core_1.EventEmitter();
        this.onAction = new core_1.EventEmitter(false);
    }
    CaTreeNodeComponent.prototype.ngOnInit = function () {
        this.caTreeComponent = this._caTreeMvcService.caTreeComponent;
    };
    CaTreeNodeComponent.prototype.ngAfterViewChecked = function () {
        if (this.caTreeComponent.editable && this.node.changing) {
            this.nodeTextInput.nativeElement.focus();
        }
    };
    CaTreeNodeComponent.prototype.onNodeExtended = function () {
        //this.extended = !this.extended;
        this.nodeExtended.emit(this.node);
    };
    CaTreeNodeComponent.prototype.getPadding = function () {
        return this.paddingPerLevel * this.level + 'px';
    };
    CaTreeNodeComponent.prototype.onNodeSelected = function () {
        this.nodeSelected.emit(this.node);
    };
    CaTreeNodeComponent.prototype.changePic = function () {
        var newPic = prompt('Change Pic for Open', '');
        if (newPic) {
            this.imgURLClose = newPic;
        }
        newPic = prompt('Change Pic for Close', '');
        if (newPic) {
            this.imgURLOpen = newPic;
        }
    };
    CaTreeNodeComponent.prototype.editNode = function () {
        this.node.changing = true;
    };
    CaTreeNodeComponent.prototype.addNode = function () {
        //this.node.extended = true;
        //
        //let node = {
        //  name: '',
        //  nr: this.localModel.getNewID(),
        //  parentNr: this.node.nr,
        //  extended: false,
        //  changing: true,
        //  selected: false,
        //  childSelected: false
        //};
        //
        //this.localModel.addNode(node);
    };
    CaTreeNodeComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === 13) {
            this.nodeTextInput.nativeElement.blur();
        }
    };
    CaTreeNodeComponent.prototype.finishNodeChange = function () {
        this.node.changing = false;
        //console.log(this.node.name);
        console.log(this.caTreeComponent.caUri);
        //this._caTreeMvcService.updateNode(this.caTreeComponent.caUri, this.node.nr, this.node.name);
        this.onAction.emit(new ca_resources_action_1.CaResourcesBaseAction(actions.CA_TREE_EDIT, this.localModel));
        //let coLink: CoLink = new CaLink();
        //coLink._rel = CoRelType.self;
        //coLink._href = 'https://api.myjson.com/bins/3j35s';
        //let caUri: CaUri = new CaUri(coLink);
        //
        //let oldNodeString = JSON.stringify(this.node, this.jsonReplacer);
        ////this.nodeTextInput.nativeElement.blur();
        //(this.node as EditableTreeNode).changing = false;
        ////if (this.nodeTextInput.nativeElement.value !== '') {
        ////  this.node.name = this.nodeTextInput.nativeElement.value;
        ////} else if (this.node.name === '') {
        ////  this.localModel.removeNode(this.node);
        ////}
        //console.log(JSON.stringify(this.node));
        //
        ////replace old node with new node in json-String, then put it to uri
        //this._caDataService.get(caUri).subscribe((resources: CoResources<BasicTreeNode>) => {
        //  this._caDataService.put(caUri, JSON.stringify(resources).replace(oldNodeString, JSON.stringify(this.node, this.jsonReplacer))).subscribe(error => {
        //    console.log(error);
        //  });
        //});
    };
    CaTreeNodeComponent.prototype.jsonReplacer = function (key, value) {
        if (key === 'selected') {
            return undefined;
        }
        else if (key === 'extended') {
            return undefined;
        }
        else if (key === 'changing') {
            return undefined;
        }
        else {
            return value;
        }
    };
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "localModel");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "level");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "node");
    __decorate([
        core_1.Input()
    ], CaTreeNodeComponent.prototype, "imgURLClose");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeSelected");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "nodeExtended");
    __decorate([
        core_1.Output()
    ], CaTreeNodeComponent.prototype, "onAction");
    __decorate([
        core_1.ViewChild('nodeTextInput')
    ], CaTreeNodeComponent.prototype, "nodeTextInput");
    CaTreeNodeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree-node',
            templateUrl: 'ca-tree-node.component.html',
            directives: [CaTreeNodeComponent],
            pipes: [ca_tree_mvc_model_1.NodeFilter]
        })
    ], CaTreeNodeComponent);
    return CaTreeNodeComponent;
}());
exports.CaTreeNodeComponent = CaTreeNodeComponent;
//# sourceMappingURL=ca-tree-node.component.js.map