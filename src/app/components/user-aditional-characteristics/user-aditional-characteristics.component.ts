import { Component, Input, OnChanges } from '@angular/core';
import { CharacterModel } from '../../models/character.model';

@Component({
  selector: 'app-user-aditional-characteristics',
  templateUrl: './user-aditional-characteristics.component.html',
  styleUrls: ['./user-aditional-characteristics.component.scss']
})
export class UserAditionalCharacteristicsComponent implements OnChanges {

  @Input() user;
  showAditionalCharacteristics = true;

  constructor() {}

  ngOnChanges() {
    this.user = new CharacterModel(this.user);
  }

  toogleAditionalCharacteristicsDisplay() {
    this.showAditionalCharacteristics = !this.showAditionalCharacteristics;
  }

}
