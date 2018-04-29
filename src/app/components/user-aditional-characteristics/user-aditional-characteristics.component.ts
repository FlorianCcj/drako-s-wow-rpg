import { Component, Input, OnChanges } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { AditionalCharacteristicsModel } from '../../models/aditional-characteristics.model';
import { calculAditionalCharacBonus, calculAditionalCharacTotalBonus} from '../../core/utils/buff.utils';
import { FormGroup, FormBuilder } from '@angular/forms';
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

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges() {
    this.user = new CharacterModel(this.user);
    this.initFormValue();
    this.calculBonus();
  }

  calculBonus() {
    [this.aditionalCharacteristics, this.aditionalPercent] = calculAditionalCharacBonus(this.user.buffs);
    this.buffBonus = calculAditionalCharacTotalBonus(
      this.formatTochararcterModel(this.userForm.value),
      this.aditionalCharacteristics,
      this.aditionalPercent
    );
  }

  formatTochararcterModel(formValue) {
    return {
      armor: {value: formValue.armor},
      manaPoint: {value: formValue.manaPoint},
      lifePoint: {value: formValue.lifePoint},
      criticalChance: {value: formValue.criticalChance},
      dodgeChance: {value: formValue.dodgeChance},
    };
  }

  initForm() {
    this.userForm = this.fb.group({
      armor: this.fb.control(null),
      manaPoint: this.fb.control(null),
      lifePoint: this.fb.control(null),
      criticalChance: this.fb.control(null),
      dodgeChance: this.fb.control(null),
    });
  }

  initFormValue() {
    this.userForm.patchValue({
      armor: this.user.aditionalCharacteristics.armor.value,
      manaPoint: this.user.aditionalCharacteristics.manaPoint.value,
      lifePoint: this.user.aditionalCharacteristics.lifePoint.value,
      criticalChance: this.user.aditionalCharacteristics.criticalChance.value,
      dodgeChance: this.user.aditionalCharacteristics.dodgeChance.value,
    });
  }

  toogleAditionalCharacteristicsDisplay() {
    this.showAditionalCharacteristics = !this.showAditionalCharacteristics;
  }

}
