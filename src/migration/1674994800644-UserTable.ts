import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1674994800644 implements MigrationInterface {
    name = 'UserTable1674994800644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "standard"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "tenant_id" uuid NOT NULL, "username" character varying(20) NOT NULL, "password_hash" text, "nick" text, "department" text, "back_mail" text, "note" text, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "standard"."user"`);
    }

}
