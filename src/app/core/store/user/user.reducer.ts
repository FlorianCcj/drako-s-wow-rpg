
import * as userActions from '../user/user.actions';
import { SettingsService } from '../../services/settings.service';
import {CharacterModel} from '../../../models/character.model';

export interface UserState {
  user: CharacterModel;
}

export const initialUserState = {
  user: null,
};

export function userReducer(state: UserState = initialUserState, action) {
  switch (action.type) {
    case userActions.ADD_USER:
    return {...state, user: action.payload};
    default:
      return state;
  }
}
