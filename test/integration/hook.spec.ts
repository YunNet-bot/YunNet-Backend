// test/integration/hook.spec.ts
/**
 * This file is global hook for integration tests.
 * It resiponsible for running setup & teardown function at mocha.
 *
 * @author Clooooode
 */
import { use as chaiUse } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chaiUse(chaiAsPromised);

export const mochaHooks = {
  beforeAll() {},
  afterAll() {},
};
