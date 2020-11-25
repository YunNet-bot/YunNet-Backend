import { MigrationInterface, QueryRunner, Table, getConnection, getConnectionOptions } from "typeorm";

export class Init1606331057077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('YunNet', true);
        await queryRunner.createTable(new Table({
            name: 'group',
            columns: [
                { name: 'gid', type: 'int', width: 10, unsigned: true, isPrimary: true },
                { name: 'name', type: 'text' },
                { name: 'description', type: 'text' },
            ],
        }), true);
        await queryRunner.createTable(new Table({
            name: 'group_user',
            columns: [
                { name: 'gid', type: 'int', width: 10, unsigned: true, isPrimary: true },
                { name: 'uid', type: 'int', width: 10, unsigned: true, isPrimary: true },
            ],
        }), true);
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: 'uid', type: 'int', width: 10, unsigned: true, isPrimary: true },
                { name: 'username', type: 'varchar', length: '20' },
                { name: 'password_hash', type: 'mediumtext' },
                { name: 'nick', type: 'mediumtext' },
                { name: 'department', type: 'mediumtext' },
                { name: 'back_mail', type: 'mediumtext' },
                { name: 'note', type: 'mediumtext' },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true);
        await queryRunner.dropTable('group_user', true);
        await queryRunner.dropTable('group', true);
        await queryRunner.dropDatabase('YunNet', true);
    }

}
