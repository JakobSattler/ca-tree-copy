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
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var ca_base_mvc_model_1 = require('../../../../../../core/lib/services/co-resources-service/ca-base-mvc.model');
var CaTreeMvcModel = (function (_super) {
    __extends(CaTreeMvcModel, _super);
    function CaTreeMvcModel() {
        _super.call(this);
        this.resources = {};
        this.resources.meta = new Array();
        this.resources.meta.usecase = new Array();
        this.resources.resource = new Array();
    }
    CaTreeMvcModel.prototype.getNode = function (nr) {
        var result = this.resources.resource.map(function (r) {
            return r.content;
        }).filter(function (res) { return res.nr === nr; });
        if (result.length === 1) {
            return result[0];
        }
        else {
            return null;
        }
    };
    CaTreeMvcModel.prototype.isNodeLeaf = function (node) {
        return this.resources.resource.filter(function (res) { return res.content.parentNr === node.nr; }).length === 0;
    };
    CaTreeMvcModel.prototype.checkChildren = function (node) {
        var selected = node.selected;
        //Pre-order through node-numbers
        var nodes = new Array();
        nodes.push(node);
        while (nodes.length > 0) {
            node = nodes.pop();
            node.selected = selected;
            this.checkParents(node);
            var children = this.resources.resource.map(function (r) {
                return r.content;
            }).filter(function (res) { return res.parentNr === node.nr; });
            for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                var child = children_1[_i];
                nodes.push(child);
            }
        }
    };
    CaTreeMvcModel.prototype.checkParents = function (node) {
        var parentNr = node.nr;
        node.childSelected = !node.childSelected;
        while (parentNr) {
            var parentNode = this.getNode(parentNr);
            if (parentNode != null) {
                if (node.selected && !parentNode.childSelected) {
                    parentNode.childSelected = true;
                }
                else if (!node.selected && !(this.areChildrenSelected(parentNode))) {
                    parentNode.childSelected = false;
                }
                if (!node.selected) {
                    parentNode.selected = false;
                }
                else if (this._allChildrenSelected(parentNode)) {
                    parentNode.selected = true;
                }
                parentNr = parentNode.parentNr;
            }
            else {
                parentNr = null;
            }
        }
    };
    CaTreeMvcModel.prototype._allChildrenSelected = function (node) {
        for (var _i = 0, _a = this.resources.resource.map(function (r) {
            return r.content;
        }).filter(function (res) { return res.parentNr === node.nr; }); _i < _a.length; _i++) {
            var n = _a[_i];
            if (!n.selected) {
                return false;
            }
        }
        return true;
    };
    CaTreeMvcModel.prototype.areChildrenSelected = function (node) {
        if (node === null) {
            return;
        }
        //Pre-order through node-numbers
        var nodes = new Array();
        nodes.push(node);
        while (nodes.length > 0) {
            node = nodes.pop();
            var children = this.resources.resource.map(function (r) {
                return r.content;
            }).filter(function (res) { return res.parentNr === node.nr; });
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                if (child.selected) {
                    return true;
                }
                nodes.push(child);
            }
        }
        return false;
    };
    CaTreeMvcModel.prototype.containsNode = function (node) {
        for (var _i = 0, _a = this.resources.resource; _i < _a.length; _i++) {
            var res = _a[_i];
            if (res.content.nr === node.nr) {
                return true;
            }
        }
        return false;
    };
    return CaTreeMvcModel;
}(ca_base_mvc_model_1.CaBaseMvcModel));
exports.CaTreeMvcModel = CaTreeMvcModel;
//  public removeNode(node: BasicTreeNode): void {
//    //Pre-order through node-numbers
//    let nrs: Array<number> = new Array<number>();
//    nrs.push(node.nr);
//
//    let nr;
//    while (nrs.length > 0) {
//      nr = nrs.pop();
//
//      let deleteIndex = this.resources.indexOf(this.getNode(nr));
//      this.resources.splice(deleteIndex, 1);
//      let children = this.resources.filter(res => res.parentNr === nr);
//      for (let child of children) {
//        nrs.push(child.nr);
//      }
//    }
//  }
//
//  public containsNode(node: BasicTreeNode): boolean {
//    for (let res of this.resources) {
//      if (res.nr === node.nr) {
//        return true;
//      }
//    }
//    return false;
//  }
//
//
//  public addNode(res: BasicTreeNode): void {
//    this.resources.push(res);
//  }
//
//  public getNewID(): number {
//    let max = Math.max.apply(Math, this.resources.map(function (res) {
//      return res.nr;
//    }));
//    return max + 1;
//  }
//
//  private _allChildrenSelected(node: SelectableTreeNode): boolean {
//    for (let n of this.resources.filter(res => res.parentNr === node.nr) as SelectableTreeNode[]) {
//      if (!n.selected) {
//        return false;
//      }
//    }
//    return true;
//  }
//
//  public checkChildren(node: SelectableTreeNode): void {
//    let selected: boolean = node.selected;
//
//    //Pre-order through node-numbers
//    let nodes: Array<SelectableTreeNode> = new Array<SelectableTreeNode>();
//    nodes.push(node);
//
//    while (nodes.length > 0) {
//      node = nodes.pop();
//
//      node.selected = selected;
//      this.checkParents(node as SelectableTreeNode, this.resources as SelectableTreeNode[]);
//      let children = this.resources.filter(res => res.parentNr === node.nr);
//      for (let child of children) {
//        nodes.push(child as SelectableTreeNode);
//      }
//    }
//  }
//
//  public checkParents(node: SelectableTreeNode, showedNodes: SelectableTreeNode[]): void {
//    let parentNr = node.nr;
//
//    node.childSelected = !node.childSelected;
//    while (parentNr) {
//      let parentNode: SelectableTreeNode = this.getNode(parentNr) as SelectableTreeNode;
//      if (parentNode != null) {
//        if (node.selected && !parentNode.childSelected) {
//          parentNode.childSelected = true;
//        } else if (!node.selected && !(this.areChildrenSelected(parentNode, showedNodes))) {
//          parentNode.childSelected = false;
//        }
//        if (!node.selected) {
//          parentNode.selected = false;
//        } else if (this._allChildrenSelected(parentNode)) {
//          parentNode.selected = true;
//        }
//        parentNr = parentNode.parentNr;
//      } else {
//        parentNr = null;
//      }
//    }
//  }
//
//  public areChildrenSelected(node: SelectableTreeNode, showedNodes: SelectableTreeNode[]): boolean {
//    if (node === null) {
//      return;
//    }
//    //Pre-order through node-numbers
//    let nodes: Array<SelectableTreeNode> = new Array<SelectableTreeNode>();
//    nodes.push(node);
//
//    while (nodes.length > 0) {
//      node = nodes.pop();
//
//      let children = showedNodes.filter(res => res.parentNr === node.nr);
//      for (let child of children) {
//        if (child.selected) {
//          return true;
//        }
//        nodes.push(child);
//      }
//    }
//    return false;
//  }
//}
//
var NodeFilter = (function () {
    function NodeFilter() {
    }
    NodeFilter.prototype.transform = function (items, value) {
        if (!items) {
            return [];
        }
        return items.filter(function (it) { return it.content.parentNr === value; });
    };
    NodeFilter = __decorate([
        core_1.Pipe({
            name: 'nodeChildFilter',
            pure: false
        }),
        core_1.Injectable()
    ], NodeFilter);
    return NodeFilter;
}());
exports.NodeFilter = NodeFilter;
//# sourceMappingURL=ca-tree-mvc-model.js.map