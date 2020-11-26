// src/migration/1606331057077-Init.ts
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class Init1606331057077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.createTables(queryRunner);
        await this.createKeyAndIndices(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await this.dropTables(queryRunner);
    }

    private async createTables(queryRunner: QueryRunner): Promise<void> {
        // Announcement
        await queryRunner.createTable(new Table({
            name: 'announcement',
            columns: [
                { isPrimary: true, name: 'announcement_id', type: 'int', width: 10, unsigned: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'title', type: 'text', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
                { name: 'content', type: 'longtext', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
                { name: 'uid', type: 'int', width: 10, unsigned: true },
            ],
        }), true);
        // BackupMac
        await queryRunner.createTable(new Table({
            name: 'backup_mac',
            columns: [
                { name: 'ip', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
                { name: 'mac', type: 'varchar', length: '18', collation: 'utf8_unicode_ci', isNullable: true,  default: 'NULL' },
            ],
        }), true),
        // Bed
        await queryRunner.createTable(new Table({
            name: 'bed',
            columns: [
                { isPrimary: true, name: 'bed', type: 'varchar', length: '9', collation: 'utf8_unicode_ci' },
                { name: 'type', type: 'int', width: 11 },
                { name: 'portal', type: 'varchar', length: '9', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'ip', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
            ],
            engine: 'InnoDB',
        }), true);
        // Group
        await queryRunner.createTable(new Table({
            name: 'group',
            columns: [
                { isPrimary: true, name: 'gid', type: 'int', width: 10, unsigned: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'text', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'description', type: 'text', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
            ],
            engine: 'InnoDB',
        }), true);
        // GroupInherit
        await queryRunner.createTable(new Table({
            name: 'group_inherit',
            columns: [
                { isPrimary: true, name: 'gid', type: 'int', width: 10, unsigned: true },
                { isPrimary: true, name: 'parent_gid', type: 'int', width: 10, unsigned: true },
            ],
        }), true);
        // GroupManagedBy
        await queryRunner.createTable(new Table({
            name: 'group_managed_by',
            columns: [
                { isPrimary: true, name: 'gid', type: 'int', width: 10, unsigned: true },
                { name: 'parent_gid', type: 'int', width: 10, unsigned: true },
            ],
        }), true);
        // GroupPermission
        await queryRunner.createTable(new Table({
            name: 'group_permission',
            columns: [
                { isPrimary: true, name: 'gid', type: 'int', width: 10, unsigned: true },
                { isPrimary: true, name: 'pid', type: 'int', width: 10, unsigned: true },
            ],
        }), true);
        // GroupUser
        await queryRunner.createTable(new Table({
            name: 'group_user',
            columns: [
                { isPrimary: true, name: 'gid', type: 'int', width: 10, unsigned: true },
                { isPrimary: true, name: 'uid', type: 'int', width: 10, unsigned: true },
            ],
            engine: 'InnoDB',
        }), true);
        // Iptable
        await queryRunner.createTable(new Table({
            name: 'iptable',
            columns: [
                { isPrimary: true, name: 'ip', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
                { name: 'ip_type_id', type: 'int', width: 11, unsigned: true, isNullable: true, default: 'NULL' },
                { name: 'is_unlimited', type: 'tinyint', width: 1, default: 0 },
                { name: 'switch_id', type: 'int', width: 11, isNullable: true, default: 'NULL' },
                { name: 'port', type: 'int', width: 11 },
                { name: 'port_type', type: 'int', width: 11 },
                { name: 'mac', type: 'varchar', length: '18', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'is_updated', type: 'tinyint', width: 1, default: 0 },
                { name: 'uid', type: 'int', width: 11, unsigned: true },
                { name: 'gid', type: 'int', width: 11, unsigned: true },
                { name: 'description', type: 'text', collation: 'utf8_unicode_ci' },
                { name: 'lock_id', type: 'int', width: 10, unsigned: true, isNullable: true, default: 'NULL' },
            ],
            engine: 'InnoDB',
        }), true);
        // IptableTest
        await queryRunner.createTable(new Table({
            name: 'iptable_test',
            columns: [
                { name: 'ip', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
                { name: 'ip_type_id', type: 'int', width: 11, unsigned: true, isNullable: true, default: 'NULL' },
                { name: 'is_unlimited', type: 'tinyint', width: 1, default: 0 },
                { name: 'switch_id', type: 'int', width: 11, isNullable: true, default: 'NULL' },
                { name: 'port', type: 'int', width: 11 },
                { name: 'port_type', type: 'int', width: 11 },
                { name: 'mac', type: 'varchar', length: '18', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
                { name: 'is_updated', type: 'tinyint', width: 1, default: 0 },
                { name: 'uid', type: 'int', width: 11, unsigned: true },
                { name: 'gid', type: 'int', width: 11, unsigned: true },
                { name: 'description', type: 'text', collation: 'utf8_unicode_ci' },
                { name: 'lock_id', type: 'int', width: 10, unsigned: true, isNullable: true, default: 'NULL' },
            ],
        }), true);
        // IpType
        await queryRunner.createTable(new Table({
            name: 'ip_type',
            columns: [
                { isPrimary: true, name: 'ip_type_id', type: 'int', width: 11, unsigned: true },
                { name: 'type', type: 'text', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
            ],
        }), true);
        // Lock
        await queryRunner.createTable(new Table({
            name: 'lock',
            columns: [
                { isPrimary: true, name: 'lock_id', type: 'int', width: 10, unsigned: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'lock_type_id', type: 'int', width: 10, unsigned: true, default: 0 },
                { name: 'ip', type: 'varchar', length: '32', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'uid', type: 'int', width: 10, unsigned: true, isNullable: true, default: 'NULL' },
                { name: 'gid', type: 'int', width: 10, unsigned: true, isNullable: true, default: 'NULL' },
                { name: 'lock_date', type: 'datetime', isNullable: true, default: 'NULL' },
                { name: 'unlock_date', type: 'datetime', isNullable: true, default: 'NULL' },
                { name: 'title', type: 'text', collation: 'utf8_unicode_ci' },
                { name: 'description', type: 'longtext', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'lock_by_user_id', type: 'int', width: 10, unsigned: true, isNullable: true, default: 'NULL' },
            ],
            engine: 'InnoDB',
        }), true);
        // LockType
        await queryRunner.createTable(new Table({
            name: 'lock_type',
            columns: [
                { isPrimary: true, name: 'lock_type_id', type: 'int', width: 10, unsigned: true },
                { name: 'str', type: 'text', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
            ],
        }), true);
        // Netflow
        await queryRunner.createTable(new Table({
            name: 'netflow',
            columns: [
                { isPrimary: true, name: 'ip', type: 'int', width: 11 },
                { name: 'wan_upload', type: 'int', width: 11 },
                { name: 'wan_download', type: 'int', width: 11 },
                { name: 'lan_upload', type: 'int', width: 11 },
                { name: 'lan_download', type: 'int', width: 11 },
            ],
        }), true);
        // Permission
        await queryRunner.createTable(new Table({
            name: 'permission',
            columns: [
                { isPrimary: true, name: 'pid', type: 'int', width: 10, unsigned: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'str', type: 'varchar', length: '255', collation: 'utf8_unicode_ci' },
            ],
        }), true);
        // Switch
        await queryRunner.createTable(new Table({
            name: 'switch',
            columns: [
                { isPrimary: true, name: 'id', type: 'int', width: 11 },
                { name: 'upper_switch', type: 'int', width: 11, isNullable: true, default: 'NULL' },
                { name: 'upper_port', type: 'int', width: 11, isNullable: true, default: 'NULL' },
                { name: 'upper_port_type', type: 'int', width: 11 },
                { name: 'location', type: 'varchar', length: '10', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'account', type: 'varchar', length: '30', collation: 'utf8_unicode_ci' },
                { name: 'password', type: 'varchar', length: '30', collation: 'utf8_unicode_ci' },
                { name: 'vlan', type: 'text', collation: 'utf8_unicode_ci' },
                { name: 'machine_type', type: 'int', width: 11 },
                { name: 'port_description', type: 'longtext', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
                { name: 'port_type', type: 'longtext', collation: 'utf8mb4_bin' },
                { name: 'ip', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
            ],
            engine: 'InnoDB',
        }), true);
        // TempTable
        await queryRunner.createTable(new Table({
            name: 'temptable',
            columns: [
                { name: 'bed', type: 'varchar', length: '200', collation: 'utf8_unicode_ci' },
                { name: 'username', type: 'varchar', length: '200', collation: 'utf8_unicode_ci' },
            ],
        }), true);
        // Token
        await queryRunner.createTable(new Table({
            name: 'token',
            columns: [
                { isPrimary: true, name: 'uid', type: 'int', width: 10, unsigned: true },
                { name: 'token', type: 'text', collation: 'utf8_unicode_ci', isNullable: true, default: 'NULL' },
                { name: 'timestamp', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
            ],
        }), true);
        // User
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { isPrimary: true, name: 'uid', type: 'int', unsigned: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'username', type: 'varchar', length: '20', collation: 'utf8mb4_unicode_ci' },
                { name: 'password_hash', type: 'mediumtext', isNullable: true, default: 'NULL', collation: 'utf8mb4_unicode_ci' },
                { name: 'nick', type: 'mediumtext', isNullable: true, default: 'NULL',  collation: 'utf8mb4_unicode_ci' },
                { name: 'department', type: 'mediumtext', isNullable: true, default: 'NULL',  collation: 'utf8mb4_unicode_ci' },
                // Origin: { name: 'back_mail', type: 'mediumtext', isNullable: true, default: 'NULL',  collation: 'utf8mb4_unicode_ci' },
                { name: 'back_mail', type: 'varchar', length: '255', isNullable: true, default: 'NULL',  collation: 'utf8mb4_unicode_ci' },
                { name: 'note', type: 'mediumtext', isNullable: true, default: 'NULL',  collation: 'utf8mb4_unicode_ci' },
            ],
            engine: 'InnoDB',
        }), true);
        // UserPermission
        await queryRunner.createTable(new Table({
            name: 'user_permission',
            columns: [
                { isPrimary: true, name: 'uid', type: 'int', width: 10, unsigned: true },
                { isPrimary: true, name: 'pid', type: 'int', width: 10, unsigned: true },
                { name: 'is_excluded', type: 'tinyint', width: 1, isNullable: true, default: 'NULL' },
            ],
        }), true);
        // Variable
        await queryRunner.createTable(new Table({
            name: 'variable',
            columns: [
                { isPrimary: true, name: 'name', type: 'varchar', length: '32', collation: 'utf8_unicode_ci' },
                { name: 'type', type: 'varchar', length: '16', collation: 'utf8_unicode_ci' },
                { name: 'value', type: 'text', isNullable: true, default: 'NULL', collation: 'utf8_unicode_ci' },
            ],
            engine: 'InnoDB',
        }), true);
    }

    private async createKeyAndIndices(queryRunner: QueryRunner): Promise<void> {
        // Announcement
        await queryRunner.createIndices('announcement', [
            new TableIndex({ name: 'announcement_fk_user_idx', columnNames: [ 'uid' ] }),
        ]);
        await queryRunner.createForeignKeys('announcement', [
            new TableForeignKey({ name: 'announcement_fk_user', columnNames: [ 'uid' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // BackupMac
        await queryRunner.createIndices('backup_mac', [
            new TableIndex({ name: 'ip', columnNames: [ 'ip' ] }),
        ]);
        await queryRunner.createForeignKeys('backup_mac', [
            new TableForeignKey({ name: 'backup_mac_fk_iptable', columnNames: [ 'ip' ], referencedTableName: 'iptable', referencedColumnNames: [ 'ip' ] }),
        ]);
        // Bed: no need.
        // Group: no need.
        // GroupInherit
        await queryRunner.createIndices('group_inherit', [
            new TableIndex({ name: 'fk_gid_groups_gid', columnNames: [ 'gid' ] }),
            new TableIndex({ name: 'group_inherit_fk_group_p_idx', columnNames: [ 'parent_gid' ] }),
        ]);
        await queryRunner.createForeignKeys('group_inherit', [
            new TableForeignKey({ name: 'group_inherit_fk_group', columnNames: [ 'gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
            new TableForeignKey({ name: 'group_inherit_fk_group_p', columnNames: [ 'parent_gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
        ]);
        // GroupManagedBy
        await queryRunner.createIndices('group_managed_by', [
            new TableIndex({ name: 'fk_gid_managed_by_gid', columnNames: [ 'gid' ] }),
            new TableIndex({ name: 'fk_gid_managed_by_parent_gid', columnNames: [ 'parent_gid' ] }),
        ]);
        await queryRunner.createForeignKeys('group_managed_by', [
            new TableForeignKey({ name: 'fk_gid_managed_by_gid', columnNames: [ 'gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
            new TableForeignKey({ name: 'fk_gid_managed_by_parent_gid', columnNames: [ 'parent_gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
        ]);
        // GroupPermission
        await queryRunner.createIndices('group_permission', [
            new TableIndex({ name: 'group_permission_fk_permission_idx', columnNames: [ 'pid' ] }),
        ]);
        await queryRunner.createForeignKeys('group_permission', [
            new TableForeignKey({ name: 'group_permission_fk_group', columnNames: [ 'gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
            new TableForeignKey({ name: 'group_permission_fk_permission', columnNames: [ 'pid' ], referencedTableName: 'permission', referencedColumnNames: [ 'pid' ] }),
        ]);
        // GroupUser
        await queryRunner.createIndices('group_user', [
            new TableIndex({ name: 'group_user_fk_user_idx', columnNames: [ 'uid' ] }),
        ]);
        await queryRunner.createForeignKeys('group_user', [
            new TableForeignKey({ name: 'group_user_fk_group', columnNames: [ 'gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
            new TableForeignKey({ name: 'group_user_fk_user', columnNames: [ 'uid' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // Iptable
        await queryRunner.createIndices('iptable', [
            new TableIndex({ name: 'mac', columnNames: [ 'mac' ], isUnique: true }),
        ]);
        await queryRunner.createForeignKeys('iptable', [
            new TableForeignKey({ name: 'iptable_fk_group', columnNames: [ 'gid' ], referencedTableName: 'group', referencedColumnNames: [ 'gid' ] }),
            new TableForeignKey({ name: 'iptable_fk_ip_type', columnNames: [ 'ip_type_id' ], referencedTableName: 'ip_type', referencedColumnNames: [ 'ip_type_id' ] }),
            new TableForeignKey({ name: 'iptable_fk_switch', columnNames: [ 'switch_id' ], referencedTableName: 'switch', referencedColumnNames: [ 'id' ] }),
            new TableForeignKey({ name: 'iptable_fk_user', columnNames: [ 'uid' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // IptableTest
        await queryRunner.createIndices('iptable_test', [
            new TableIndex({ name: 'mac', columnNames: [ 'mac' ], isUnique: true }),
            new TableIndex({ name: 'iptable_fk_switch', columnNames: [ 'switch_id' ] }),
            new TableIndex({ name: 'iptable_fk_ip_type', columnNames: [ 'ip_type_id' ] }),
            new TableIndex({ name: 'iptable_fk_user', columnNames: [ 'uid' ] }),
            new TableIndex({ name: 'iptable_fk_group', columnNames: [ 'gid' ] }),
        ]);
        // IpType: no need.
        // Lock
        await queryRunner.createIndices('lock', [
            new TableIndex({ name: 'lock_fk_ip_idx', columnNames: [ 'ip' ] }),
            new TableIndex({ name: 'lock_fk_lock_type_idx', columnNames: [ 'lock_type_id' ] }),
            new TableIndex({ name: 'lock_fk_user_idx', columnNames: [ 'lock_by_user_id' ] }),
        ]);
        await queryRunner.createForeignKeys('lock', [
            new TableForeignKey({ name: 'lock_fk_lock_type', columnNames: [ 'lock_type_id' ], referencedTableName: 'lock_type', referencedColumnNames: [ 'lock_type_id' ] }),
            new TableForeignKey({ name: 'lock_fk_user', columnNames: [ 'lock_by_user_id' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // LockType: no need.
        // Netflow: no need.
        // Permission
        await queryRunner.createIndices('permission', [
            new TableIndex({ name: 'permission_key', columnNames: [ 'str' ], isUnique: true }),
        ]);
        // Switch
        await queryRunner.createIndices('switch', [
            new TableIndex({ name: 'switch_fk_self_upper_switch_idx', columnNames: [ 'upper_switch' ] }),
        ]);
        await queryRunner.createForeignKeys('switch', [
            new TableForeignKey({ name: 'switch_fk_self_upper_id', columnNames: [ 'upper_switch' ], referencedTableName: 'switch', referencedColumnNames: [ 'id' ] }),
        ]);
        // Token
        await queryRunner.createForeignKeys('token', [
            new TableForeignKey({ name: 'token_fk_user', columnNames: [ 'uid' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // User
        await queryRunner.createIndices('user', [
            new TableIndex({ name: 'uid_UNIQUE', columnNames: [ 'uid' ], isUnique: true }),
            new TableIndex({ name: 'username_UNIQUE', columnNames: [ 'username' ], isUnique: true }),
            new TableIndex({ name: 'back_mail_UNIQUE', columnNames: [ 'back_mail' ], isUnique: true }),
        ]);
        // UserPermission
        await queryRunner.createIndices('user_permission', [
            new TableIndex({ name: 'user_permission_fk_permission_idx', columnNames: [ 'pid' ] }),
        ]);
        await queryRunner.createForeignKeys('user_permission', [
            new TableForeignKey({ name: 'user_permission_fk_permission', columnNames: [ 'pid' ], referencedTableName: 'permission', referencedColumnNames: [ 'pid' ] }),
            new TableForeignKey({ name: 'user_permission_fk_user', columnNames: [ 'uid' ], referencedTableName: 'user', referencedColumnNames: [ 'uid' ] }),
        ]);
        // Variable: no need.
    }

    private async dropTables(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('variable', true);
        await queryRunner.dropTable('user', true);
        await queryRunner.dropTable('switch', true);
        await queryRunner.dropTable('lock', true);
        await queryRunner.dropTable('iptable', true);
        await queryRunner.dropTable('group_user', true);
        await queryRunner.dropTable('group', true);
        await queryRunner.dropTable('bed', true);
    }

}
