import {Component} from '@angular/core';
import {CaTreeComponent} from './components/ca-tree.component';

@Component({
  moduleId: module.id,
  selector: 'ca-app',
  templateUrl: 'app.component.html',
  directives: [CaTreeComponent]
})
export class AppComponent {

}
