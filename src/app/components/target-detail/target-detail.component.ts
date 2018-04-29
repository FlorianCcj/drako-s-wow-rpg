import { Component, Input } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { AppState } from '../../core/store/store.variables';
import { Store } from '@ngrx/store';
import { DeleteTarget } from '../../core/store/target/target.actions';

@Component({
  selector: 'app-target-detail',
  templateUrl: './target-detail.component.html',
  styleUrls: ['./target-detail.component.scss']
})
export class TargetDetailComponent {

  @Input() target: CharacterModel;

  constructor(private store: Store<AppState>) { }

  deleteTarget(target) {
    this.store.dispatch(new DeleteTarget(target));
  }
}
