import {CaBaseMvcModel} from './ca-base-mvc.model';

export class CaResourcesBaseAction {
  action: string;
  model: CaBaseMvcModel;

  constructor(action: string, model: CaBaseMvcModel) {
    this.action = action;
    this.model = model;
  }
}
