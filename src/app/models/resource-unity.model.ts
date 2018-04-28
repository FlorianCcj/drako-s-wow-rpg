import { BonusModel } from './bonus.model';

export class ResourceUnityModel {
  constructor(
    public value = new BonusModel(),
    public maxValue: number = null,
    public partial: number = null
  ) {}
}
