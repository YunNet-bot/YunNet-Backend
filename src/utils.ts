// src/utils.ts
/* eslint-disable @typescript-eslint/explicit-module-boundary-types,
                  @typescript-eslint/no-explicit-any,
                  no-param-reassign */

/**
 * Filter the undefined value in given object.
 *
 * @author Clooooode
 * @param object any value with object type to be filter.
 * @returns objects after filtering undefined value.
 */
export function filterObjectUndefined(object: any): any {
  Object.keys(object).forEach((key: string) => object[key] === undefined && delete object[key]);
  return object;
}
