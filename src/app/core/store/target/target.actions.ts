import {type} from '../../utils/store';
import {Action} from '@ngrx/store';

export const ADD_TARGET = type('[Target] Add target');
export const TARGET_TARGET = type('[Target] Target target');
export const DELETE_TARGET = type('[Target] Delete target');
export const REMOVE_TARGET = type('[Target] Remove target');

/**
 * Take the list of the document that user is allow to access
 */
export class AddTarget implements Action {
  readonly type = ADD_TARGET;
  constructor(public payload: any) {}
}

/**
 * Take the list of the document that user is allow to access
 */
export class TargetTarget implements Action {
  readonly type = TARGET_TARGET;
  constructor(public payload: any) {}
}

/**
 * Remove target from list
 */
export class DeleteTarget implements Action {
  readonly type = DELETE_TARGET;
  constructor(public payload: any) {}
}

/**
 * remove a target from target target
 */
export class RemoveTarget implements Action {
  readonly type = REMOVE_TARGET;
  constructor(public payload: any) {}
}

