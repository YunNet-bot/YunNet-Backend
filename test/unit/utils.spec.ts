// test/utils.spec.ts
import { expect } from 'chai';
import { filterObjectUndefined, parseIntDefault } from '@/utils';

describe('utils', () => {
  describe('method filterObjectUndefined', () => {
    it('should filter all undefined value', () => {
      const obj = {
        a: undefined,
        b: 5,
      };
      const afterFilter = filterObjectUndefined(obj);
      expect(afterFilter).to.be.deep.eq({ b: 5 });
    });
  });

  describe('method parseIntDefault', () => {
    it('should get parsed number', () => {
      const parsed = parseIntDefault({
        value: '123',
        default: 333,
      });
      expect(parsed).to.be.eq(123);
    });

    it('should get default number', () => {
      const parsed = parseIntDefault({
        value: '',
        default: 444,
      });
      expect(parsed).to.be.eq(444);
    });
  });
});
