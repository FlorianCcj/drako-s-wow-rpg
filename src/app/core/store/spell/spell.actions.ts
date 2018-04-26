import {type} from '../../utils/store';
import {Action} from '@ngrx/store';

export const CAST_SPELL = type('[Spell] Cast Spell');

export class CastSpell implements Action {
  readonly type = CAST_SPELL;
  constructor(public payload: any) {}
}
