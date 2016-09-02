import {Component, OnInit, Input} from '@angular/core';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {CaTreeMvcService} from '../services/ca-tree-mvc-model/ca-tree-mvc.service';
import {CaUri} from '../../../../../core/lib/services/co-data/ca-data.service';
import {
  CaTreeMvcModel,
  BasicTreeNode,
  SelectableTreeNode,
  NodeFilter
} from '../services/ca-tree-mvc-model/ca-tree-mvc-model';
import {CaTreeMvcModelBuilder} from '../services/ca-tree-mvc-model/ca-tree-mvc-model.builder';
//import {CoContentDto} from '../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/model';
import {CoLink} from '../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CaLink} from '../../../../../core/lib/services/co-data/co-data.model';
import {CoRelType} from '../../../../../core/lib/dto/at/campusonline/core/lib/model/codata/annotation/link/model';
import {CoResources} from '../../../../../core/lib/dto/at/campusonline/core/lib/codata/api/resources/dto/model';
//import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
//import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'ca-tree',
  templateUrl: 'ca-tree.component.html',
  directives: [CaTreeNodeComponent],
  styles: [`
    div {
      padding-left: 10px;
    }
  `],
  pipes: [NodeFilter]
})
export class CaTreeComponent implements OnInit {
  @Input()
  selectable: boolean;

  @Input()
  editable: boolean;

  public restUri: string = 'https://api.myjson.com/bins/3j35s';
  caUri: CaUri;
  //tableModelBuilder: CaTableMvcModelBuilder<CoContentDto> = new CaTableMvcModelBuilder<CoContentDto>();
  localModel: CaTreeMvcModel;

  treeModelBuilder: CaTreeMvcModelBuilder<BasicTreeNode> = new CaTreeMvcModelBuilder<BasicTreeNode>();

  constructor(private _caTreeMvcService: CaTreeMvcService<BasicTreeNode>) {
  }

  ngOnInit(): void {
    this._caTreeMvcService.caTreeComponent = this;

    let coLink: CoLink = new CaLink();
    coLink._rel = CoRelType.self;
    coLink._href = this.restUri;
    this.caUri = new CaUri(coLink);
    this._caTreeMvcService.init(this.caUri).subscribe((resources: CoResources<BasicTreeNode>) => {
      for (let d1 of resources.resource.filter(res => !res.content.parentNr)) {
        this.treeModelBuilder.addResource(d1);
        for (let d2 of resources.resource.filter(res => res.content.parentNr === d1.content.nr)) {
          this.treeModelBuilder.addResource(d2);
        }
      }
      this.localModel = this.treeModelBuilder.build();
    });
    //this._caTreeMvcService.updateNode(this.caUri, 706544, 'Gstörter Hund');
    return null;
  }

  public onAction(action: any): void {
    //this._caTreeMvcService.dispatchAction(action).subscribe((resources: CoResources<BasicTreeNode>) => {
    //  console.log('onAction');
    //  this.localModel = this.treeModelBuilder.addResources(resources.resource).build();
    //});
  }

  public onNodeSelected(node: SelectableTreeNode): void {
    console.log('selected');
    console.log(node);
    console.log(node.selected);
    node.selected = !node.selected;
    console.log(node.selected);
    this.localModel.checkChildren(node);
  }

  public onNodeExtended(node: SelectableTreeNode): void {
    this.loadChildren(node);
    node.extended = !node.extended;
  }

  loadChildren(node: BasicTreeNode): void {
    //load children + next level to load proper icon
    this._caTreeMvcService.init(this.caUri).subscribe((resources: CoResources<BasicTreeNode>) => {
        for (let d1 of resources.resource.filter(res => res.content.parentNr === node.nr)) {
          if (!this.localModel.containsNode(d1.content)) {
            this.treeModelBuilder.addResource(d1);
          }
          for (let d2 of resources.resource.filter(res => res.content.parentNr === d1.content.nr)) {
            if (!this.localModel.containsNode(d2.content)) {
              this.treeModelBuilder.addResource(d2);
            }
          }
        }
        this.localModel = this.treeModelBuilder.build();
      }
    );
  }

}
