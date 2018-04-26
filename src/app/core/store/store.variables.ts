import { UserState, userReducer } from './user/user.reducer';
import { TargetState, targetReducer } from './target/target.reducer';

export interface AppState {
  user: UserState;
  target: TargetState;
}

export const REDUCERS = {
  user: userReducer,
  target: targetReducer
};

export const EFFECTS = [
];
