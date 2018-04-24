import {regenNewRound} from './store';

describe('utils/store.ts', () => {
  describe('regenNewRound', () => {
    let result;
    beforeEach(() => {
      result = {user: null, partial: null};
    });

    it('should return the same data if turnToRegen was a -1', () => {
      const oldUserState = 0;
      const oldPartialState = 0;
      const property = 'rage';
      expect(regenNewRound(oldUserState, oldPartialState, property)).toEqual({user: oldUserState, partial: oldPartialState});
    });

    it('should increase partial if it s not the turnToRegen', () => {
      const oldUserState = 0;
      const oldPartialState = 0;
      const property = 'bloodRune';
      expect(regenNewRound(oldUserState, oldPartialState, property)).toEqual({user: oldUserState, partial: oldPartialState + 1});
    });

    it('should increase user and reset partial if it s turnToRegen', () => {
      const oldUserState = 0;
      const oldPartialState = 2;
      const property = 'bloodRune';
      expect(regenNewRound(oldUserState, oldPartialState, property)).toEqual({user: oldUserState + 1, partial: 0});
    });

    it('sould increase partial only if user < max (and partial must be at 0)', () => {
      const oldUserState = 2;
      const oldPartialState = 2;
      const property = 'bloodRune';
      expect(regenNewRound(oldUserState, oldPartialState, property)).toEqual({user: oldUserState, partial: 0});
    });
  });
});
