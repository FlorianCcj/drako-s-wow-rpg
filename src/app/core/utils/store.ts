import { SettingsService } from '../services/settings.service';
import { CharacterModel } from '../../models/character.model';

const settings = new SettingsService();
const maxResources = settings.maxResources;
const turnToRegen = settings.turnToRegen;

const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique`);
  }
  typeCache[<string>label] = true;
  return <T>label;
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

export function dealBuff(targetState, buff) {
  return targetState.list.map((target: CharacterModel) => {
    const finder = targetState.target.find((targetI) => targetI.name === target.name);
    if (!!finder) {
      return asignBuffToTarget(target, buff.payload);
    } else {
      return {...target};
    }
  });
}

export function asignBuffToTarget(target, buff) {
  if (buff.type === 'buff') {
    return {...target, buffs: [...target.buffs, buff]};
  } else if (buff.type === 'debuff') {
    return {...target, debuffs: [...target.debuffs, buff]};
  } else {
    return {...target};
  }
}
