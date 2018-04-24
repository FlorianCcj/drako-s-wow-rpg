import { ResourceModel } from './resource.model';
import {CharacteristicsModel} from './characteristics.model';
import { BuffModel } from './buff.model';
import {ModelClass} from './model.class';
import { AditionalCharacteristicsModel } from './aditional-characteristics.model';

export class CharacterModel extends ModelClass {
  name: string = null;
  resources: ResourceModel = new ResourceModel();
  characteristics: CharacteristicsModel = new CharacteristicsModel();
  aditionalCharacteristics: AditionalCharacteristicsModel = new AditionalCharacteristicsModel();
  buffs: BuffModel[] = [];
  debuff: BuffModel[] = [];

  constructor (data?: any) {
    super();
    if (data) {
      this.hydrateObject(data);
    }
  }
}
