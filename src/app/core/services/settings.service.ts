import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  public maxResources = {
    bloodRune: 2,
    frostRune: 2,
    unholyRune: 2,
    runicPoint: 100,
    manaPoint: 100000,
    lifePoint: 100000,
    rage: 100,
    energy: 100,
  };

  public initResources = {
    bloodRune: -1,
    frostRune: -1,
    unholyRune: -1,
    runicPoint: 0,
    manaPoint: -1,
    lifePoint: -1,
    rage: 0,
    energy: -1,
  };

  public initPartial = {
    bloodRune: 0,
    frostRune: 0,
    unholyRune: 0,
    runicPoint: 0,
    manaPoint: 0,
    lifePoint: 0,
    rage: 0,
    energy: 0,
  };

  public turnToRegen = {
    bloodRune: 8,
    frostRune: 8,
    unholyRune: 8,
    runicPoint: -1,
    manaPoint: 100,
    lifePoint: 100,
    rage: -1,
    energy: 5
  };
}


