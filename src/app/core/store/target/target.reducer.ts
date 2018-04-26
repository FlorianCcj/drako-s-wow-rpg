
import * as targetActions from '../target/target.actions';
import { CharacterModel } from '../../../models/character.model';

export interface TargetState {
  list: CharacterModel[];
  target: CharacterModel[];
}

export const initialTargetState = {
  list: [],
  target: [],
};

export function targetReducer(state: TargetState = initialTargetState, action) {
  switch (action.type) {
    case targetActions.ADD_TARGET:
      return {...state, list: [...state.list, action.payload]};
    case targetActions.TARGET_TARGET:
      return {...state, target: [...state.target, action.payload]};
    case targetActions.REMOVE_TARGET:
      return {...state, target: state.target.filter((target) => target !== action.payload)};
    case targetActions.DELETE_TARGET:
      return {...state, list: state.list.filter((target) => target !== action.payload)};
    default:
      return state;
  }
}
