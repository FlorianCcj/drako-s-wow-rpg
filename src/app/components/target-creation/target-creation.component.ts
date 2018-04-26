import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store/store.variables';
import { AddTarget } from '../../core/store/target/target.actions';

@Component({
  selector: 'app-target-creation',
  templateUrl: './target-creation.component.html',
  styleUrls: ['./target-creation.component.scss']
})
export class TargetCreationComponent {

  targetForm: FormGroup;
  targetTypeList = [
    {title: 'friend', value: 'friend'},
    {title: 'user', value: 'user'},
    {title: 'enemy', value: 'enemy'},
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.initForm();
  }

  initForm() {
    this.targetForm = this.fb.group({
      name: this.fb.control(null, Validators.required),
      type: this.fb.control(null)
    });
  }

  saveTarget() {
    if (this.targetForm.valid) {
      this.store.dispatch(new AddTarget(this.targetForm.value));
      this.targetForm.reset();
    }
  }

}
