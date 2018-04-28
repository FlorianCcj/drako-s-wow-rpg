import { Component, Input, OnChanges } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { AditionalCharacteristicsModel } from '../../models/aditional-characteristics.model';
import {calculateBonus, calculTotalBonus} from '../../core/utils/buff.utils';
@Component({
  selector: 'app-user-aditional-characteristics',
  templateUrl: './user-aditional-characteristics.component.html',
  styleUrls: ['./user-aditional-characteristics.component.scss']
})
export class UserAditionalCharacteristicsComponent implements OnChanges {

  @Input() user: CharacterModel;
  showAditionalCharacteristics = true;
  aditionalCharacteristics: AditionalCharacteristicsModel;
  aditionalPercent: AditionalCharacteristicsModel;
  buffBonus: AditionalCharacteristicsModel;

  constructor() {}

  ngOnChanges() {
    this.user = new CharacterModel(this.user);
    this.buffBonus = new AditionalCharacteristicsModel();
    [this.aditionalCharacteristics, this.aditionalPercent] = calculateBonus(this.user.buffs);
    this.buffBonus = calculTotalBonus(
      this.user.aditionalCharacteristics,
      this.aditionalCharacteristics,
      this.aditionalPercent
    );
  }

  toogleAditionalCharacteristicsDisplay() {
    this.showAditionalCharacteristics = !this.showAditionalCharacteristics;
  }

}
