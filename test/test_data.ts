// test/test_data.ts
/**
 * This file defined any pre-insert needed value to test database when running integration tests.
 * Add more variables below with proper export and naming, and use typeorm to insert it at
 *  hook.spec.ts.
 *
 * @author Clooooode
 */
import { Permission } from "@/entry";

export const permission: Permission = new Permission({ pid: 1, str: 'first permission' });

// export const somethingmore: SomeType = new SomeType({ ... });
