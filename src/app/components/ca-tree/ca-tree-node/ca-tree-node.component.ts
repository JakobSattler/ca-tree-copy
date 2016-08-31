import {
  Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked,
  Inject, forwardRef, AfterViewInit
} from '@angular/core';
import {CaTreeService} from '../../../services/ca-tree.service';
import {
  BasicTreeNode,
  CaTreeMvcModel,
  NodeFilter
} from '../../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model';
import {CaTreeComponent} from '../ca-tree.component';

@Component({
  moduleId: module.id,
  selector: 'ca-tree-node',
  templateUrl: 'ca-tree-node.component.html',
  styleUrls: ['ca-tree-node.component.css'],
  directives: [CaTreeNodeComponent],
  pipes: [NodeFilter]
})
export class CaTreeNodeComponent implements AfterViewChecked, AfterViewInit {

  paddingPerLevel: number = 10;
  extended: boolean;

  @Input()
  model: CaTreeMvcModel;

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

  @ViewChild('nodeTextInput')
  nodeTextInput: ElementRef;

  @ViewChild('nodeIcon')
  nodeIcon: ElementRef;

  public caTreeComponent: CaTreeComponent;

  ngOnInit() {
    this.caTreeComponent = this.caTreeService.caTreeComponent;

  }

  constructor(private caTreeService: CaTreeService) {
  }

  ngAfterViewInit(): void {
    console.log('afterViewInit');
    if (this.model.isNodeLeaf(this.node)) {
      this.nodeIcon.nativeElement.class = 'glyphicon glyphicon-minus';
      console.log(this.node.name + ' is leaf');
    }
  }

  ngAfterViewChecked(): void {
    if (this.node.changing) {
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
    let newPic = prompt("Change Pic for Open", "");
    if (newPic) {
      this.imgURLClose = newPic;
    }
    newPic = prompt("Change Pic for Close", "");
    if (newPic) {
      this.imgURLOpen = newPic;
    }
  }

  editNode(): void {
    this.node.changing = true;
  }

  addNode(): void {
    //this.node.extended = true;
    //
    //let node = {
    //  name: '',
    //  nr: this.model.getNewID(),
    //  parentNr: this.node.nr,
    //  extended: false,
    //  changing: true,
    //  selected: false,
    //  childSelected: false
    //};
    //
    //this.model.addNode(node);
  }

  finishNodeChange(): void {
    this.nodeTextInput.nativeElement.blur();
    this.node.changing = false;
    if (this.nodeTextInput.nativeElement.value !== '') {
      this.node.name = this.nodeTextInput.nativeElement.value;
    } else if (this.node.name === '') {
      //this.model.removeNode(this.node);
    }
  }

  //removeNode(): void {
  //  this.model.removeNode(this.node);
  //}
}
