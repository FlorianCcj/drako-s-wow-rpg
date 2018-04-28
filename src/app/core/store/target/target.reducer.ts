
import * as targetActions from '../target/target.actions';
import * as spellActions from '../spell/spell.actions';
import { CharacterModel } from '../../../models/character.model';
import { dealBuff, asignBuffToTarget } from '../../utils/store';

export interface TargetState {
  user: CharacterModel;
  list: CharacterModel[];
  target: CharacterModel[];
}

export const initialTargetState = {
  user: null,
  list: [],
  target: [],
};

export function targetReducer(state: TargetState = initialTargetState, action) {
  switch (action.type) {
    case targetActions.ADD_TARGET:
      return {
        ...state,
        user: action.payload.type === 'user' ? action.payload : state.user,
        list: [...state.list, new CharacterModel(action.payload)]
      };
    case targetActions.TARGET_TARGET:
      return {...state, target: [...state.target, new CharacterModel(action.payload)]};
    case targetActions.REMOVE_TARGET:
      return {...state, target: state.target.filter((target) => target !== action.payload)};
    case targetActions.DELETE_TARGET:
      return {...state, list: state.list.filter((target) => target !== action.payload)};
    case spellActions.CAST_SPELL:
      const newTargetList = dealBuff(state, action);
      const newUser = asignBuffToTarget(state.user, action);
      return {
        ...state,
        list: newTargetList,
        target: [],
        user: newUser,
      };
    default:
      return state;
  }
}
