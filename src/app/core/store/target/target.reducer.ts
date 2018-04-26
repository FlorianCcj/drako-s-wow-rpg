
import * as targetActions from '../target/target.actions';
import * as spellActions from '../spell/spell.actions';
import { CharacterModel } from '../../../models/character.model';

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
      if (action.payload.type === 'user') {

      }
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
      return {
        ...state,
        list: state.list.map((target: CharacterModel) => {
          const finder = state.target.find((targetI) => targetI.name === target.name);
          if (!!finder) {
            if (action.payload.type === 'buff') {
              return {...target, buffs: [...target.buffs, action.payload]};
            } else if (action.payload.type === 'debuff') {
              return {...target, debuffs: [...target.debuffs, action.payload]};
            } else {
              return {...target};
            }
          } else {
            return {...target};
          }
        }),
        target: []
      };
    default:
      return state;
  }
}
