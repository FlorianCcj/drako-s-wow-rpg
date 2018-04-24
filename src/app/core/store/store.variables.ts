import { UserState, userReducer } from './user/user.reducer';

export interface AppState {
  user: UserState;
}

export const REDUCERS = {
  user: userReducer,
};

export const EFFECTS = [
];
