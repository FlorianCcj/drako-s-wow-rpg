
import * as targetActions from '../target/target.actions';
import * as spellActions from '../spell/spell.actions';
import { CharacterModel } from '../../../models/character.model';
import { dealBuff, asignBuffToTarget, regenNewRound, returnStateResource, regenResources, useResources } from '../../utils/store';
import { reducBuffDuration } from '../../utils/buff.utils';
import { BuffModel } from '../../../models/buff.model';

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
        user: action.payload.type === 'user' ? new CharacterModel(action.payload) : state.user,
        list: [...state.list, new CharacterModel(action.payload)]
      };
    case targetActions.TARGET_TARGET:
      return {...state, target: [...state.target, new CharacterModel(action.payload)]};
    case targetActions.REMOVE_TARGET:
      return {...state, target: state.target.filter((target) => target.name !== action.payload.name)};
    case targetActions.DELETE_TARGET:
      return {...state, list: state.list.filter((target) => target.name !== action.payload.name)};
    case spellActions.CAST_SPELL:
      const newTargetList = dealBuff(
        state.list.filter(target => target && target.type !== 'user'),
        state.target,
        action
      );
      let findUser = state.target.find((target) => target && target.type === 'user');
      if (!!findUser) {
        findUser = new CharacterModel(
          asignBuffToTarget(
            new CharacterModel(useResources(
              state.user,
              action.payload
            )),
            action.payload
          )
        );
      } else {
        findUser = new CharacterModel(useResources(
          state.user,
          action.payload
        ));
      }
      return {
        ...state,
        list: [findUser, ...newTargetList],
        target: [],
        user: findUser,
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
          buffs: reducBuffDuration(target.buffs),
          debuffs: reducBuffDuration(target.debuffs),
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
