import 'rxjs/add/operator/map';
import {Injectable, Pipe} from '@angular/core';
import {CaBaseMvcModel} from '../../../../../../core/lib/services/co-resources-service/ca-base-mvc.model';
import {CoContentDto, CoMetaDto} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/model';
import {
  CoResources
} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';

export interface BasicTreeNode extends CoContentDto {
  name: String;
  nr: number;
  parentNr: number;
  extended: boolean;
}

export interface SelectableTreeNode extends BasicTreeNode {
  selected: boolean;
  childSelected: boolean;
}

export interface EditableTreeNode extends BasicTreeNode {
  changing: boolean;
}

export class CaTreeMvcModel extends CaBaseMvcModel {
  resources: CoResources<CoContentDto>;

  constructor() {
    super();
    this.resources = {};
    this.resources.meta = new Array<CoMetaDto>();
    (<any>this.resources.meta).usecase = new Array<any>();
    this.resources.resource = new Array<CoContentDto>();
  }

  public getNode(nr: number): BasicTreeNode {
    let result = this.resources.resource.map(function (r): CoContentDto {
      return r.content;
    }).filter(res => (res as BasicTreeNode).nr === nr);

    if (result.length === 1) {
      return result[0] as BasicTreeNode;
    } else {
      return null;
    }
  }

  public isNodeLeaf(node: BasicTreeNode): boolean {
    return this.resources.resource.filter(res => (res.content as BasicTreeNode).parentNr === node.nr).length === 0;
  }

  public checkChildren(node: SelectableTreeNode): void {
    let selected: boolean = node.selected;

    //Pre-order through node-numbers
    let nodes: Array<SelectableTreeNode> = new Array<SelectableTreeNode>();
    nodes.push(node);

    while (nodes.length > 0) {
      node = nodes.pop();

      node.selected = selected;
      this.checkParents(node as SelectableTreeNode);
      let children = this.resources.resource.map(function (r): CoContentDto {
        return r.content;
      }).filter(res => (res as BasicTreeNode).parentNr === node.nr);
      for (let child of children) {
        nodes.push(child as SelectableTreeNode);
      }
    }
  }

  public checkParents(node: SelectableTreeNode): void {
    let parentNr = node.nr;

    node.childSelected = !node.childSelected;
    while (parentNr) {
      let parentNode: SelectableTreeNode = this.getNode(parentNr) as SelectableTreeNode;
      if (parentNode != null) {
        if (node.selected && !parentNode.childSelected) {
          parentNode.childSelected = true;
        } else if (!node.selected && !(this.areChildrenSelected(parentNode))) {
          parentNode.childSelected = false;
        }
        if (!node.selected) {
          parentNode.selected = false;
        } else if (this._allChildrenSelected(parentNode)) {
          parentNode.selected = true;
        }
        parentNr = parentNode.parentNr;
      } else {
        parentNr = null;
      }
    }
  }

  private _allChildrenSelected(node: SelectableTreeNode): boolean {
    for (let n of this.resources.resource.map(function (r): CoContentDto {
      return r.content;
    }).filter(res => (res as BasicTreeNode).parentNr === node.nr) as SelectableTreeNode[]) {
      if (!n.selected) {
        return false;
      }
    }
    return true;
  }

  public areChildrenSelected(node: SelectableTreeNode): boolean {
    if (node === null) {
      return;
    }
    //Pre-order through node-numbers
    let nodes: Array<SelectableTreeNode> = new Array<SelectableTreeNode>();
    nodes.push(node);

    while (nodes.length > 0) {
      node = nodes.pop();

      let children = this.resources.resource.map(function (r): CoContentDto {
        return r.content;
      }).filter(res => (res as BasicTreeNode).parentNr === node.nr);

      for (let child of children) {
        if ((child as SelectableTreeNode).selected) {
          return true;
        }
        nodes.push(child as SelectableTreeNode);
      }
    }
    return false;
  }

  public containsNode(node: BasicTreeNode): boolean {
    for (let res of this.resources.resource) {
      if ((res.content as BasicTreeNode).nr === node.nr) {
        return true;
      }
    }
    return false;
  }
}
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
@Pipe({
  name: 'nodeChildFilter',
  pure: false
})
@Injectable()
export class NodeFilter {
  transform(items: any[], value: string): any[] {
    if (!items) {
      return [];
    }
    return items.filter(it => it.content.parentNr === value);
  }
}
