import {
  Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import {
  BasicTreeNode, CaTreeMvcModel, NodeFilter,
  EditableTreeNode
} from '../../services/ca-tree-mvc-model/ca-tree-mvc-model';
import {CaTreeComponent} from '../ca-tree.component';
import {CaTreeMvcService} from '../../services/ca-tree-mvc-model/ca-tree-mvc.service';
import {CoContentDto} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/model';
import {CaDataService} from '../../../../../../core/lib/services/co-data/ca-data.service';
//import {CoLink} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/link/dto/model';
//import {CoRelType} from '../../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/annotation/link/model';
//import {CaLink} from '../../../../../../core/lib/services/co-data/co-data.model';
//import {CoResources} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CaResourcesBaseAction} from '../../../../../../core/lib/services/co-resources-service/ca-resources.action';
import * as actions from '../../services/ca-tree-mvc-model/ca-tree-actions';
//import {CoResources} from '../../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';

@Component({
  moduleId: module.id,
  selector: 'ca-tree-node',
  templateUrl: 'ca-tree-node.component.html',
  directives: [CaTreeNodeComponent],
  pipes: [NodeFilter]
})
export class CaTreeNodeComponent implements AfterViewChecked {
  paddingPerLevel: number = 10;

  @Input()
  localModel: CaTreeMvcModel;

  @Input()
  level: number;

  @Input()
  node: BasicTreeNode;

  @Input()
  imgURLClose: String = 'http://plainicon.com/dboard/userprod/2800_a1826/prod_thumb/plainicon.com-44945-128px.png';
  imgURLOpen: String = 'https://freeiconshop.com/files/edd/folder-open-solid.png';

  @Output()
  nodeSelected: EventEmitter<BasicTreeNode> = new EventEmitter<BasicTreeNode>();

  @Output()
  nodeExtended: EventEmitter<BasicTreeNode> = new EventEmitter<BasicTreeNode>();

  @Output()
  public onAction: EventEmitter<CaResourcesBaseAction> = new EventEmitter<CaResourcesBaseAction>(false);

  @ViewChild('nodeTextInput')
  nodeTextInput: ElementRef;

  caTreeComponent: CaTreeComponent;

  constructor(private _caTreeMvcService: CaTreeMvcService<CoContentDto>, private _caDataService: CaDataService<CoContentDto>) {
  }

  ngOnInit(): void {
    this.caTreeComponent = this._caTreeMvcService.caTreeComponent;
  }

  ngAfterViewChecked(): void {
    if (this.caTreeComponent.editable && (this.node as EditableTreeNode).changing) {
      this.nodeTextInput.nativeElement.focus();
    }
  }

  onNodeExtended(): void {
    //this.extended = !this.extended;
    this.nodeExtended.emit(this.node);
  }

  getPadding(): String {
    return this.paddingPerLevel * this.level + 'px';
  }

  onNodeSelected(): void {
    this.nodeSelected.emit(this.node);
  }

  changePic(): void {
    let newPic = prompt('Change Pic for Open', '');
    if (newPic) {
      this.imgURLClose = newPic;
    }
    newPic = prompt('Change Pic for Close', '');
    if (newPic) {
      this.imgURLOpen = newPic;
    }
  }

  editNode(): void {
    (this.node as EditableTreeNode).changing = true;
  }

  addNode(): void {
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
  }

  onKeyDown(event): void {
    if (event.keyCode === 13) {
      this.nodeTextInput.nativeElement.blur();
    }
  }

  finishNodeChange(): void {
    (this.node as EditableTreeNode).changing = false;
    //console.log(this.node.name);
    console.log(this.caTreeComponent.caUri);
    //this._caTreeMvcService.updateNode(this.caTreeComponent.caUri, this.node.nr, this.node.name);
    this.onAction.emit(new CaResourcesBaseAction(actions.CA_TREE_EDIT, this.localModel));
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
  }

  jsonReplacer(key, value): any {
    if (key === 'selected') {
      return undefined;
    } else if (key === 'extended') {
      return undefined;
    } else if (key === 'changing') {
      return undefined;
    } else {
      return value;
    }
  }

  //removeNode(): void {
  //  this.localModel.removeNode(this.node);
  //}
}
