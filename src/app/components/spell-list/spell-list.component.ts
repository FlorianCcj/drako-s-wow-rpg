import { Component, OnInit } from '@angular/core';
import { BuffModel } from '../../models/buff.model';
import { isString, isNumber, isObject } from 'util';
import { takeChild } from '../../core/utils/utils';
import { AppState } from '../../core/store/store.variables';
import { Store } from '@ngrx/store';
import { CastSpell } from '../../core/store/spell/spell.actions';
import { BonusModel } from '../../models/bonus.model';
import { ResourceUnityModel } from '../../models/resource-unity.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spell-list',
  templateUrl: './spell-list.component.html',
  styleUrls: ['./spell-list.component.scss']
})
export class SpellListComponent implements OnInit {

  columns = [
    {
      title: 'name',
      field: ['name'],
    }, {
      title: 'runicPoint',
      field: ['resources', 'runicPoint', 'value']
    }, {
      title: 'Armor',
      field: ['aditionalCharacteristics', 'armor']
    }, {
      title: 'force',
      field: ['characteristics', 'force']
    }
  ];
  spells: BuffModel[] = [];
  spells$: Observable<any>;
  spellsSubscription$: Subscription;
  filteredSpells: BuffModel[] = [];
  showData: any[] = [];
  filters: any = {};

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
  ) {
    this.spells$ = this.http.get('assets/spells/spells.json');
    this.spellsSubscription$ = this.spells$.subscribe(spells => this.spells = spells);
  }

  ngOnInit() {
    this.spells = this.initSpells();
    this.showData = this.initShowData(this.spells);
  }

  initSpells() {
    return [
      new BuffModel({
        name: 'tsointsoin', type: 'buff',
        aditionalCharacteristics: {
          criticalChance: {value: 2, unit: 'unit'},
          dodgeChance: {value: 2, unit: 'unit'},
        },
        characteristics: {
          force: new BonusModel(10, '%'),
          agilite: new BonusModel(10, '%'),
        },
        resources: {runicPoint: {value: new BonusModel(10)}},
        duration: -1,
      }),
      new BuffModel({
        name: 'carapace de glace', type: 'buff',
        aditionalCharacteristics: {
          armor: {value: 50, unit: '%'},
        },
        duration: 3,
        cooldown: 10,
      }),
      new BuffModel({
        name: 'sang vampirique', type: 'buff',
        duration: 3,
        cooldown: 10,
      }),
      new BuffModel({
        name: 'protection magique', type: 'buff',
        resources: {runicPoint: {value: new BonusModel(-20)}},
        duration: 3,
        cooldown: 10,
      }),
      new BuffModel({
        name: 'Toucher de glace', type: 'debuff',
        resources: {frostRune: {value: new BonusModel(-1)}},
        duration: 3,
      }),
      new BuffModel({
        name: 'Frappe de peste', type: 'debuff',
        resources: {unholyRune: {value: new BonusModel(-1)}},
        duration: 3,
      }),
      new BuffModel({
        name: 'Frappe de mort', type: 'debuff',
        resources: {
          frostRune: {value: new BonusModel(-1)},
          unholyRune: {value: new BonusModel(-1)},
        },
      }),
      new BuffModel({
        "name": "furoncle sanglant",
        "type": "debuff",
        "resources": {
          "bloodRune": {"value": {"value": -1, "unit": "unit"}},
          "runicPoint": {"value": {"value": 10, "unit": "unit"}}
        },
        "damageCalcul": "2*F",
        "description": "aoe"
      }), 
    ];
  }

  initShowData(spells) {
    return spells.map((spell) => {
      return this.columns.map(column => {
        const field = this.takeField({...spell}, [...column.field]);
        return JSON.stringify({...spell}) === JSON.stringify({...field}) ? null : field;
      });
    });
  }

  addFilterToList($event, column) {
    if (column) {
      if ($event) {
        this.filters[column] = $event;
      } else {
        this.filters[column] = null;
      }
    }
  }

  applyFilter(spells, filters) {
    let newSpellList = [...spells];
    for (const filter in filters) {
      if (filters[filter] !== null && filters[filter] !== undefined && filters[filter] !== '') {
        newSpellList = newSpellList.filter((spell) => {
          const column = {...this.columns.find((col) => col.title === filter)};
          const spellValue = this.takeField({...spell}, column.field);
          return JSON.stringify(spellValue).includes(filters[filter]);
        });
      }
    }
    return newSpellList;
  }

  filterColumn($event, column) {
    this.addFilterToList($event, column);
    this.filteredSpells = this.applyFilter(this.spells, this.filters);
    this.showData = this.initShowData(this.filteredSpells);
  }

  takeField(parent, path) {
    const pathOfExtraction = [...path];
    if (path && path[0] && parent && parent[path[0]]) {
      const pathToFollow = pathOfExtraction.shift();
      return this.takeField(parent[pathToFollow], pathOfExtraction);
    } else {
      return parent;
    }
  }

  castSpell(spellName) {
    const finder = this.spells.find((spellI) => spellI.name === spellName);
    this.store.dispatch(new CastSpell(finder));
  }

  printBonusValue(bonus) {
    if (isObject(bonus) && bonus.hasOwnProperty('value') && bonus.hasOwnProperty('unit')) {
      return bonus.unit !== 'unit' ? `${bonus.value}${bonus.unit}` : `${bonus.value}`;
    } else {
      return bonus;
    }
  }
}
