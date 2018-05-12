import { Component, OnInit } from '@angular/core';
import { BuffModel } from '../../models/buff.model';
import { isString, isNumber, isObject } from 'util';
import { takeChild } from '../../core/utils/utils';
import { AppState } from '../../core/store/store.variables';
import { Store } from '@ngrx/store';
import { CastSpell } from '../../core/store/spell/spell.actions';
import { BonusModel } from '../../models/bonus.model';
import { ResourceUnityModel } from '../../models/resource-unity.model';

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
  showData: any[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.spells = [
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
    ];
    this.showData = this.spells.map((spell) => {
      return this.columns.map(column => {
        const field = this.takeField(spell, [...column.field]);
        return JSON.stringify({...spell}) === JSON.stringify({...field}) ? null : field;
      });
    });
  }

  takeField(parent, path) {
    if (path && path[0] && parent && parent[path[0]]) {
      const pathToFollow = path.shift();
      return this.takeField(parent[pathToFollow], path);
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
