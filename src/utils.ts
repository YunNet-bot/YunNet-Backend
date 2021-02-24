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

/**
 * Parse an integer if success(not NaN) otherwise return default value.
 * 
 * @author Clooooode
 * @param options options with string value to be parse, default number value, and optional number radix.
 *  if radix is not give, 10 will be default radix.
 * @see parseInt
 * @returns parsed value or default value.
 */
export function parseIntDefault(options: {
  value: string;
  default: number;
  radix?: number;
}): number {
  const number = parseInt(options.value, options.radix);
  return isNaN(number) ? options.default : number;
}
