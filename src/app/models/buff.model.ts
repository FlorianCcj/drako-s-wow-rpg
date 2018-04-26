import {CharacteristicsModel} from './characteristics.model';
import {AditionalCharacteristicsModel} from './aditional-characteristics.model';
import { ModelClass } from './model.class';
import { ResourceModel } from './resource.model';

export class BuffModel extends ModelClass {
  name = '';
  damagePerRound = 0;
  type: any = null;
  resources: ResourceModel = null;
  characteristics: CharacteristicsModel = null;
  aditionalCharacteristics: AditionalCharacteristicsModel = null;
  duration = 0;

  constructor (data?: any) {
    super();
    if (data) {
      this.hydrateObject(data);
    }
  }
}
