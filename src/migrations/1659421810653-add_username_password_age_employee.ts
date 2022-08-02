import {MigrationInterface, QueryRunner} from "typeorm";

export class addUsernamePasswordAgeEmployee1659421810653 implements MigrationInterface {
    name = 'addUsernamePasswordAgeEmployee1659421810653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
    }

}
