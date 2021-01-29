// test/utils.spec.ts
import { expect } from 'chai';
import { filterObjectUndefined } from '@/utils';

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
});
