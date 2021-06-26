// test/test_data.ts
/**
 * This file defined any pre-insert needed value to test database when running integration tests.
 * Add more variables below with proper export and naming, and use typeorm to insert it at
 *  {@link hook.spec.ts}.
 *
 * For instance, {@link Announcement} entry has an fk for field uid, then you shall provide a
 * {@link User} entry to be insert.
 *
 * @author Clooooode
 */
import { Permission, IpTable, Group, IpType } from '@/entry';

export const permission: Permission = new Permission({ pid: 1, str: 'first permission' });
export const group: Group = new Group({
  gid: 123,
  name: 'test_group',
  description: 'this is a test group.',
});
export const iptype: IpType = new IpType({
  ip_type_id: 137,
  type: 'iptype from test data',
});
export const iptable: IpTable = new IpTable({
  ip: '111.112.113.114',
  ip_type_id: 1,
  is_unlimited: 2,
  switch_id: 3,
  port: 4,
  port_type: 5,
  mac: 'a',
  is_updated: 1,
  uid: 1,
  gid: 123,
  description: 'hi',
  lock_id: 1,
});
// export const somethingmore: SomeType = new SomeType({ ... });
