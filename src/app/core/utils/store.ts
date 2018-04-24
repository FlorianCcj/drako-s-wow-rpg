import { SettingsService } from '../services/settings.service';

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

export function regenNewRound(oldUserState, oldPartialState, property) {
  const maxProperty = maxResources[property];
  const turnToRegenProperty = turnToRegen[property];
  let newUserState = oldUserState;
  let newPartialState = oldPartialState;

  if (turnToRegenProperty !== -1 && oldUserState < maxProperty) {
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
