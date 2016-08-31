"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ca_tree_mvc_model_1 = require('../../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model');
var CaTreeNodeComponent = (function () {
    function CaTreeNodeComponent(caTreeService) {
        this.caTreeService = caTreeService;
        this.paddingPerLevel = 10;
        this.imgURLClose = 'http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-44945-128px.png';
        this.imgURLOpen = 'https://freeiconshop.com/files/edd/folder-open-solid.png';
        this.nodeSelected = new core_1.EventEmitter();
        this.nodeExtended = new core_1.EventEmitter();
    }
    CaTreeNodeComponent.prototype.ngOnInit = function () {
        this.caTreeComponent = this.caTreeService.caTreeComponent;
    };
    CaTreeNodeComponent.prototype.ngAfterViewInit = function () {
        console.log('afterViewInit');
        if (this.localModel.isNodeLeaf(this.node)) {
            this.nodeIcon.nativeElement.class = 'glyphicon glyphicon-minus';
            console.log(this.node.name + ' is leaf');
        }
    };
    CaTreeNodeComponent.prototype.ngAfterViewChecked = function () {
        if (this.caTreeComponent.editable && this.node.changing) {
            this.nodeTextInput.nativeElement.focus();
        }
    };
    CaTreeNodeComponent.prototype.onNodeExtended = function () {
        this.nodeExtended.emit(this.node);
    };
    CaTreeNodeComponent.prototype.getPadding = function () {
        return this.paddingPerLevel * this.level + 'px';
    };
    CaTreeNodeComponent.prototype.onNodeSelected = function () {
        this.nodeSelected.emit(this.node);
    };
    CaTreeNodeComponent.prototype.changePic = function () {
        var newPic = prompt("Change Pic for Open", "");
        if (newPic) {
            this.imgURLClose = newPic;
        }
        newPic = prompt("Change Pic for Close", "");
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
    CaTreeNodeComponent.prototype.finishNodeChange = function () {
        this.nodeTextInput.nativeElement.blur();
        this.node.changing = false;
        if (this.nodeTextInput.nativeElement.value !== '') {
            this.node.name = this.nodeTextInput.nativeElement.value;
        }
        else if (this.node.name === '') {
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
        core_1.ViewChild('nodeTextInput')
    ], CaTreeNodeComponent.prototype, "nodeTextInput");
    __decorate([
        core_1.ViewChild('nodeIcon')
    ], CaTreeNodeComponent.prototype, "nodeIcon");
    CaTreeNodeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ca-tree-node',
            templateUrl: 'ca-tree-node.component.html',
            styleUrls: ['ca-tree-node.component.css'],
            directives: [CaTreeNodeComponent],
            pipes: [ca_tree_mvc_model_1.NodeFilter]
        })
    ], CaTreeNodeComponent);
    return CaTreeNodeComponent;
}());
exports.CaTreeNodeComponent = CaTreeNodeComponent;
//# sourceMappingURL=ca-tree-node.component.js.map