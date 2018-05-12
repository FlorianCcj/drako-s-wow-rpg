import { SettingsService } from '../services/settings.service';
import { CharacterModel } from '../../models/character.model';
import { ResourceUnityModel } from '../../models/resource-unity.model';
import { BuffModel } from '../../models/buff.model';
import { ResourceModel } from '../../models/resource.model';

const settings = new SettingsService();
const maxResources = settings.maxResources;
const initResources = settings.initResources;
const initPartial = settings.initPartial;
const turnToRegen = settings.turnToRegen;

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
}

export function regenResources() {
  const newResources = {};
  for (const carac in initResources) {
    if (initResources.hasOwnProperty(carac)) {
      const caracValue = initResources[carac] === -1 ? maxResources[carac] : initResources[carac] ;
      newResources[carac] = new ResourceUnityModel(caracValue, maxResources[carac], initPartial[carac]);
    }
  }
  return newResources;
}

export function useResources(user: CharacterModel, spell: BuffModel) {
  const newResources = {...user.resources};
  for (const resource in newResources) {
    if (spell.resources.hasOwnProperty(resource)) {
      newResources[resource].value += spell.resources[resource].value.value;
    }
  }
  return {
    ...user,
    resources: newResources,
  };
}

export function returnStateResource(ressourceState, property) {
  const newResource = regenNewRound(
    ressourceState.value,
    ressourceState.partial,
    property
  );
  return {
    ...ressourceState,
    value: newResource.user,
    partial: newResource.partial,
  };
}

export function regenNewRound(oldUserState, oldPartialState, property) {
  const maxProperty = maxResources[property];
  const turnToRegenProperty = turnToRegen[property];
  let newUserState = oldUserState;
  let newPartialState = oldPartialState;

  if (turnToRegenProperty !== -1 && (oldUserState < maxProperty && maxProperty !== -1)) {
    if (oldPartialState < turnToRegenProperty - 1) {
      newPartialState++;
    } else {
      newUserState++;
      newPartialState = 0;
    }
  } else {
    newPartialState = 0;
  }
  return {user: newUserState, partial: newPartialState};
}

export function dealBuff(list, targetList, buff) {
  return list.map((target: CharacterModel) => {
    const finder = targetList.find((targetI) => targetI.name === target.name);
    if (!!finder) {
      return asignBuffToTarget(target, buff.payload);
    } else {
      return {...target};
    }
  });
}

export function asignBuffToTarget(target: CharacterModel, buff: BuffModel) {
  const findBuff = target.buffs.find(buffI => buffI.name === buff.name);
  if (!(!!findBuff && findBuff.duration === -1) && buff) {
    if (buff.type === 'buff') {
      return {...target, buffs: [...target.buffs, buff]};
    } else if (buff.type === 'debuff') {
      return {...target, debuffs: [...target.debuffs, buff]};
    } else {
      return {...target};
    }
  } else {
    return {...target};
  }
}

export function patchCharacteristics(userState: CharacterModel, characteristics) {
  const userCharacteristics = {};
  for (const characteristic in characteristics) {
    if (characteristics.hasOwnProperty(characteristic)) {
      userCharacteristics[characteristic] = {
        ...userState[characteristic],
        value: characteristics[characteristic],
      };
    }
  }

  return {
    ...userCharacteristics,
  };
}
