import {Component, OnInit} from '@angular/core';
import {CaTreeService} from '../../services/ca-tree.service';
//import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
import {
  CaTreeMvcModel,
  BasicTreeNode,
  SelectableTreeNode
} from '../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model';
import {CoResources} from '../../dto/at/campusonline/core/lib/codata/api/resources/dto/model';
import {CoContentDto} from '../../dto/at/campusonline/core/lib/model/codata/model';
import {CoRelType} from '../../dto/at/campusonline/core/lib/model/codata/annotation/link/model';
import {CoLink} from '../../dto/at/campusonline/core/lib/codata/api/link/dto/model';
import {CaLink} from '../../services/co-data/co-data.model';
import {CaUri, CaDataService} from '../../services/co-data/ca-data.service';
import {CaResourcesService} from '../../services/co-resources-service/ca-resources.service';
import {CaAccessTokenService} from '../../services/ca-access-token.service';
import {CaTreeMvcService} from '../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc.service';
import {NodeFilter} from '../../services/co-resources-service/ca-tree-mvc-model/ca-tree-mvc-model';
import {CaTreeNodeComponent} from './ca-tree-node/ca-tree-node.component';
//import * as _ from 'lodash';

@Component({
  moduleId: module.id,
  selector: 'ca-tree',
  templateUrl: 'ca-tree.component.html',
  directives: [CaTreeNodeComponent],
  providers: [CaTreeService, CaResourcesService, CaDataService, CaAccessTokenService, CaTreeMvcService],
  styles: [`
    div {
      padding-left: 10px;
    }
  `],
  pipes: [NodeFilter]
})
export class CaTreeComponent implements OnInit {
  model: CaTreeMvcModel;

  restUri: string = 'https://api.myjson.com/bins/31ync';
  caUri: CaUri;
  //tableModelBuilder: CaTableMvcModelBuilder<CoContentDto> = new CaTableMvcModelBuilder<CoContentDto>();
  localModel: CaTreeMvcModel;

  constructor(private _caResourcesService: CaTreeMvcService<CoContentDto>, private _caTreeService: CaTreeService) {
  }

  ngOnInit(): void {
    this._caTreeService.caTreeComponent = this;

    let coLink: CoLink = new CaLink();
    coLink._rel = CoRelType.self;
    coLink._href = this.restUri;
    this.caUri = new CaUri(coLink);
    this.model = new CaTreeMvcModel();
    this._caResourcesService.init(this.caUri).subscribe((resources: CoResources<CoContentDto>) => {
      for (let d1 of resources.resource.filter(res => !(res.content as BasicTreeNode).parentNr)) {
        this.model.resources.resource.push(d1);
        for (let d2 of resources.resource.filter(res => (res.content as BasicTreeNode).parentNr
        === (d1.content as BasicTreeNode).nr)) {
          this.model.resources.resource.push(d2);
        }
      }
      //this.model.resources.resource = resources.resource;
      //console.log(resources);
      //this.model.resources.resource = resources.resource;
      //let asdf: any[] = resources.resource[0].content;
      //console.log(resources.resource[0].content);
      //console.log(typeof resources.resource);
      //console.log(resources.resource.length);
      //for(let r of resources.resource){
      //  console.log(r);
      //}
      //console.log(resources.resource);
      //this.model.resources.resource = resources.resource;
      //console.log(this.model.resources.resource);
      //for (let c of this.model.resources.resource) {
      //  console.log(c);
      //}
    });
    return null;
  }

  public onNodeSelected(node: SelectableTreeNode): void {
    node.selected = !node.selected;
    this.model.checkChildren(node);
  }

  public onNodeExtended(node: SelectableTreeNode): void {
    this.loadChildren(node);
    node.extended = !node.extended;
  }

  loadChildren(node: BasicTreeNode) {
    //load children + next level to load proper icon
    console.log("loadChildren");
    this._caResourcesService.init(this.caUri).subscribe((resources: CoResources<CoContentDto>) => {
        for (let d1 of resources.resource.filter(res => (res.content as BasicTreeNode).parentNr === node.nr)) {
          if (!this.model.containsNode(d1.content as BasicTreeNode)) {
            this.model.resources.resource.push(d1);
          }
          for (let d2 of resources.resource.filter(res => (res.content as BasicTreeNode).parentNr === (d1.content as BasicTreeNode).nr)) {
            if (!this.model.containsNode(d2.content as BasicTreeNode)) {
              this.model.resources.resource.push(d2);
            }
          }
        }
      }
    )
  }

}
