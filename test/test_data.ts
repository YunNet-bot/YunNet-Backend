// test/test_data.ts
/**
 * This file defined any pre-insert needed value to test database when running integration tests.
 * Add more variables below with proper export and naming, and use typeorm to insert it at
 *  hook.spec.ts.
 *
 * @author Clooooode
 */
import { Permission, IpTable } from '@/entry';

export const permission: Permission = new Permission({ pid: 1, str: 'first permission' });
export const iptableData: IpTable = new IpTable({
  ip: '111.112.113.114',
  ip_type_id: 1,
  is_unlimited: 1,
  switch_id: 1,
  port: 123,
  port_type: 1,
  mac: 'a',
  is_updated: 1,
  uid: 1,
  gid: 1,
  description: 'hi',
  lock_id: 1,
});
// export const somethingmore: SomeType = new SomeType({ ... });
