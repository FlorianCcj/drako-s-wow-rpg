import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/store/store.variables';
import { Observable } from 'rxjs/Observable';
import { CharacterModel } from './models/character.model';
import { AddTarget } from './core/store/target/target.actions';
import { NewRound, HaveANap } from './core/store/spell/spell.actions';
import {BonusModel} from './models/bonus.model';

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
        force: {value: 41},
        agilite: {value: 5},
        vitalite: {value: 31},
        intel: {value: 2},
        charisme: {value: 5},
      },
      aditionalCharacteristics: {
        armor: new BonusModel(18.6, 'unit'),
        manaPoint: new BonusModel(0, 'unit'),
        lifePoint: new BonusModel(555, 'unit'),
        criticalChance: new BonusModel(3, 'unit'),
        dodgeChance: new BonusModel(0, 'unit'),
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
    this.store.dispatch(new HaveANap());
  }
}
