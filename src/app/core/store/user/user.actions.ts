import {type} from '../../utils/store';
import {Action} from '@ngrx/store';

export const ADD_USER = type('[User] Add user');

/**
 * Take the list of the document that user is allow to access
 */
export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: any) {}
}
