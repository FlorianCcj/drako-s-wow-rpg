import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store.variables';
import { Observable } from 'rxjs/Observable';
import { CharacterModel } from './models/character.model';
import { AddTarget } from './core/store/target/target.actions';
import { NewRound } from './core/store/spell/spell.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user$: Observable<CharacterModel>;
  public targetList$: Observable<CharacterModel[]>;
  public selectedList$: Observable<CharacterModel[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select(appState => appState.target.user);
    this.targetList$ = this.store.select(appState => appState.target.list);
    this.selectedList$ = this.store.select(appState => appState.target.target);
    this.store.dispatch(new AddTarget({
      name: 'moi',
      type: 'user',
      characteristics: {
        force: {value: 25},
        agilite: {value: 10},
        vitalite: {value: 25},
        intel: {value: 10},
        charisme: {value: 10},
      },
      resources: {
        bloodRune: {value: 0, partial: 0, maxValue: 2},
        frostRune: {value: 0, partial: 0, maxValue: 2},
        unholyRune: {value: 0, partial: 0, maxValue: 2},
        runicPoint: {value: 0, partial: 0, maxValue: 100},
        manaPoint: {value: 0, partial: 0, maxValue: 2000},
        lifePoint: {value: 0, partial: 0, maxValue: 2000},
        rage: {value: 0, partial: 0, maxValue: 100},
        energy: {value: 0, partial: 0, maxValue: 100},
      }
    }));
  }

  handleNewRoundClick() {
    this.store.dispatch(new NewRound());
  }

  handleHaveANapClick() {
    // this.store.dispatch(new HaveANap());
  }
}
