import {BonusModel} from './bonus.model';

export class AditionalCharacteristicsModel {
  armor = new BonusModel();
  manaPoint = new BonusModel();
  lifePoint = new BonusModel();
  criticalChance = new BonusModel();
  dodgeChance = new BonusModel();
}
