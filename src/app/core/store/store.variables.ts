import { TargetState, targetReducer } from './target/target.reducer';

export interface AppState {
  target: TargetState;
}

export const REDUCERS = {
  target: targetReducer
};

export const EFFECTS = [
];
