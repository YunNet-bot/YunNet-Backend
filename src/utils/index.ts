// src/utils/index.ts
import { createHash } from 'crypto';
import { countBy } from 'lodash';

export * from './color';

const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Upper-Case
  + 'abcdefghijklmnopqrstuvwxyz' // Lower-Case
  + '0123456789' // Numbers
  + '_$#^&'; // Symbols

/**
 * Stringified UUIDv4.
 * See [RFC 4112](https://tools.ietf.org/html/rfc4122)
 * @pattern [0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}
 * @example "52907745-7672-470e-a803-a2f8feb52944"
 */
export type UUID = string;

/**
 * Parse an integer if success(not NaN) otherwise return default value.
 *
 * @author Clooooode
 * @param options
 *  options with string value to be parse, default number value, optional numberradix.
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
  return Number.isNaN(number) ? options.default : number;
}

export function md5(data: string): string {
  return createHash('md5').update(data).digest('hex');
}

export function getRangeRandomInt(min: number, max: number): number {
  const ceilMin = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - ceilMin) + 1) + ceilMin;
}

export function randomStr(length: number): string {
  let output = '';
  for (let i = 0; i < length; i += 1) {
    output += dictionary[getRangeRandomInt(0, dictionary.length - 1)];
  }
  return output;
}

const timeStrFormatReg = new RegExp('(([0-1][0-9])|(2[0-3])):[0-5][0-9]:[0-5][0-9]');
export function timeStrToSeconds(timeStr: string): number {
  if (timeStrFormatReg.test(timeStr) === false) {
    throw new Error('The format should be HH:mm:ss, 24 hours format.');
  }

  const digits = timeStr.split(':');
  if (digits.length !== 3) {
    throw new Error('The format should be HH:mm:ss, 24 hours format.');
  }
  return parseInt(digits[0], 10) * 3600 + parseInt(digits[1], 10) * 60 + parseInt(digits[2], 10);
}

export function twYear(dateOrYear: Date | number): number {
  return (typeof dateOrYear === 'number' ? dateOrYear : dateOrYear.getFullYear()) - 1911;
}

export function dateFormat(birthdate: Date): string {
  const [year, month, date] = birthdate.toString().split('-');
  const numYear = parseInt(year, 10);
  return `民國${twYear(numYear)}年 / 西元${year}年${month}月${date}日`;
}

export function dateToSevenDigit(someDate: Date): string {
  const [year, month, date] = someDate.toISOString().substring(0, 10).split('-');
  const numYear = parseInt(year, 10);
  return `${twYear(numYear).toString().padStart(3, '0')}${month.padStart(2, '0')}${date.padStart(2, '0')}`;
}

export function dateDiffInDay(a: Date, b: Date): number {
  return Math.abs(a.setHours(0, 0, 0) - b.setHours(0, 0, 0)) / 86400000;
}

export function duplicate(items: Array<number>): Array<number> {
  return Object.entries(countBy(items))
    .reduce<Array<string>>((acc, [key, val]) => (val > 1 ? acc.concat(key) : acc), [])
    .map(Number);
}

export function calAgeFromBirthdate(birthdate: Date): number {
  const ageDifMs = Date.now() - birthdate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
// src/utils.ts

/**
 * Filter the undefined value in given object.
 *
 * @author Clooooode
 * @param object any value with object type to be filter.
 * @returns objects after filtering undefined value.
 * eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,
@typescript-eslint/no-explicit-any,
no-param-reassign
*/
export function filterObjectUndefined(object: any): any {
  Object.keys(object).forEach((key: string) => object[key] === undefined && delete object[key]);
  return object;
}
