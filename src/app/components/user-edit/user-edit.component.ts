import { Component, OnChanges, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CharacterModel } from '../../models/character.model';
import {calculCaracAutoSucceed, calculDiceToLaunch} from '../../core/utils/dice';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnChanges {

  @Input() user: CharacterModel;
  public userForm: FormGroup;
  showCarac = true;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnChanges() {
    this.user = new CharacterModel(this.user);
    this.initFormValue();
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
    return calculCaracAutoSucceed(this.userForm.value[property]);
  }

  calculPropertyDiceToLaunch(property) {
    return calculDiceToLaunch(this.userForm.value[property]);
  }

  toogleUserCaracVisibility() {
    this.showCarac = !this.showCarac;
  }
}
