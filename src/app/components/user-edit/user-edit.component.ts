import { Component, OnChanges, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CharacterModel } from '../../models/character.model';
import {calculCaracAutoSucceed, calculDiceToLaunch} from '../../core/utils/dice';
import { CharacteristicsModel } from '../../models/characteristics.model';
import { calculCharacCharacBonus, calculCharacTotalBonus } from '../../core/utils/buff.utils';
import { AppState } from '../../core/store/store.variables';
import { Store } from '@ngrx/store';
import { PatchUserSCharacteristics } from '../../core/store/target/target.actions';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnChanges {

  @Input() user: CharacterModel;
  public userForm: FormGroup;
  showCarac = true;

  aditionalCharacteristics: CharacteristicsModel;
  aditionalPercent: CharacteristicsModel;
  buffBonus: CharacteristicsModel;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.initForm();
  }

  ngOnChanges() {
    this.user = new CharacterModel(this.user);
    this.initFormValue();
    this.calculBonus();
  }

  initForm() {
    this.userForm = this.fb.group({
      force: this.fb.control(null),
      agilite: this.fb.control(null),
      vitalite: this.fb.control(null),
      intel: this.fb.control(null),
      charisme: this.fb.control(null),
    });
  }

  initFormValue() {
    if (this.user && this.user.characteristics) {
      this.userForm.patchValue({
        force: this.user.characteristics.force.value,
        agilite: this.user.characteristics.agilite.value,
        vitalite: this.user.characteristics.vitalite.value,
        intel: this.user.characteristics.intel.value,
        charisme: this.user.characteristics.charisme.value,
      });
    }
  }

  calculPropertyAutoSucceed(property) {
    return calculCaracAutoSucceed(this.userForm.value[property] + this.buffBonus[property].value);
  }

  calculPropertyDiceToLaunch(property) {
    return calculDiceToLaunch(this.userForm.value[property] + this.buffBonus[property].value);
  }

  calculBonus() {
    [this.aditionalCharacteristics, this.aditionalPercent] = calculCharacCharacBonus(this.user.buffs);
    this.buffBonus = calculCharacTotalBonus(
      this.formatTochararcterModel(this.userForm.value),
      this.aditionalCharacteristics,
      this.aditionalPercent
    );
  }

  formatTochararcterModel(formValue) {
    return {
      force: {value: formValue.force},
      agilite: {value: formValue.agilite},
      vitalite: {value: formValue.vitalite},
      intel: {value: formValue.intel},
      charisme: {value: formValue.charisme},
    };
  }

  toogleUserCaracVisibility() {
    this.showCarac = !this.showCarac;
  }

  handleChangeFormValue(formValue) {
    this.store.dispatch(new PatchUserSCharacteristics(formValue));
  }
}
