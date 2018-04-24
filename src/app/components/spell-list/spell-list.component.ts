import { Component, OnInit } from '@angular/core';
import { BuffModel } from '../../models/buff.model';
import { isString, isNumber, isObject } from 'util';
import { takeChild } from '../../core/utils/utils';

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
      title: 'Type',
      field: ['type']
    }, {
      title: 'Armor',
      field: ['aditionalCharacteristics', 'armor']
    }
  ];
  spells: BuffModel[] = [];
  showData: any[] = [];

  constructor() {}

  ngOnInit() {
    this.spells = [
      new BuffModel({
        name: 'tsointsoin', type: 'buff',
        aditionalCharacteristics: {
          armor: {value: 2, unit: '%'}
        }
      }),
      new BuffModel({
        name: 'carapace de glace', type: 'CD',
        aditionalCharacteristics: {
          armor: {value: 50, unit: '%'}
        }
      }),
    ];
    this.showData = this.spells.map((spell) => {
      return this.columns.map(column => this.takeField(spell, [...column.field]));
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

  castSpell(spell) {
    console.log(spell);
  }
}
