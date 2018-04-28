import {type} from '../../utils/store';
import {Action} from '@ngrx/store';

export const CAST_SPELL = type('[Spell] Cast Spell');

export class CastSpell implements Action {
  readonly type = CAST_SPELL;
  constructor(public payload: any) {}
}

export const NEW_ROUND = type('[Round] New Round');

export class NewRound implements Action {
  readonly type = NEW_ROUND;
}
