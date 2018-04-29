
import * as targetActions from '../target/target.actions';
import * as spellActions from '../spell/spell.actions';
import { CharacterModel } from '../../../models/character.model';
import { dealBuff, asignBuffToTarget, regenNewRound, returnStateResource, regenResources } from '../../utils/store';
import { reducBuffDuration } from '../../utils/buff.utils';

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
      return {...state, target: state.target.filter((target) => target.name !== action.payload.name)};
    case targetActions.DELETE_TARGET:
      return {...state, list: state.list.filter((target) => target.name !== action.payload.name)};
    case spellActions.CAST_SPELL:
      const newTargetList = dealBuff(state, action);
      const findUser = state.target.find((target) => target.type === 'user');
      return {
        ...state,
        list: newTargetList,
        target: [],
        user: !!findUser ? asignBuffToTarget(findUser, action.payload) : {...state.user},
      };
    case spellActions.NEW_ROUND:
      return {...state,
        user: {...state.user,
          resources: {
            ...state.user.resources,
            bloodRune: returnStateResource(state.user.resources.bloodRune, 'bloodRune'),
            frostRune: returnStateResource(state.user.resources.frostRune, 'frostRune'),
            unholyRune: returnStateResource(state.user.resources.unholyRune, 'unholyRune'),
            runicPoint: returnStateResource(state.user.resources.runicPoint, 'runicPoint'),
            manaPoint: returnStateResource(state.user.resources.manaPoint, 'manaPoint'),
            lifePoint: returnStateResource(state.user.resources.lifePoint, 'lifePoint'),
            rage: returnStateResource(state.user.resources.rage, 'rage'),
            energy: returnStateResource(state.user.resources.energy, 'energy'),
          },
          buffs: reducBuffDuration(state.user.buffs),
          debuffs: reducBuffDuration(state.user.debuffs),
        },
        list: state.list.map(target => ({
          ...target,
          buffs: reducBuffDuration(state.user.buffs),
          debuffs: reducBuffDuration(state.user.debuffs),
        })),
      };
    case spellActions.HAVE_A_NAP:
      return {
        ...state,
        user: {
          ...state.user,
          resources: regenResources()
        }
      };
    default:
      return state;
  }
}
