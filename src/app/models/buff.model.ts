import {CharacteristicsModel} from './characteristics.model';
import {AditionalCharacteristicsModel} from './aditional-characteristics.model';
import { ModelClass } from './model.class';

export class BuffModel extends ModelClass {
  name = '';
  damagePerRound = 0;
  type: any = null;
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
