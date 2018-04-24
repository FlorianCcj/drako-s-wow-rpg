import { isObject } from 'util';

export function takeChild(parent, path: any[]) {
  let child = parent;
  if (path && path[0] && isObject(parent) && parent[path[0]]) {
    const path0 = path.shift();
    child = takeChild(parent[path0], path);
  }
  return child;
}
