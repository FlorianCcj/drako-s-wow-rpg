import { Component, OnInit, Input } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { AppState } from '../../core/store/store.variables';
import { Store } from '@ngrx/store';
import { RemoveTarget, TargetTarget, DeleteTarget } from '../../core/store/target/target.actions';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.scss']
})
export class TargetListComponent {

  @Input() user: CharacterModel;
  @Input() targetList: CharacterModel[];
  @Input() selectedList: CharacterModel[];

  constructor(private store: Store<AppState>) { }

  deleteTarget(target) {
    this.store.dispatch(new DeleteTarget(target));
  }

  handleClickTarget(target: CharacterModel) {
    if (this.isSelected(target)) {
      this.store.dispatch(new RemoveTarget(target));
    } else {
      this.store.dispatch(new TargetTarget(target));
    }
  }

  isSelected(target: CharacterModel): boolean {
    return !!this.selectedList.find((targetI) => targetI === target);
  }

  targetClass(target: CharacterModel) {
    return {
      targetUser: target.type === 'user',
      targetFriend: target.type === 'friend',
      targetEnemy: target.type === 'enemy',
    };
  }

}
