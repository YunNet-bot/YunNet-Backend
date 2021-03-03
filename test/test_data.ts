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
import { Permission } from "@/entry";

export const permission: Permission = new Permission({ pid: 1, str: 'first permission' });

// export const somethingmore: SomeType = new SomeType({ ... });
