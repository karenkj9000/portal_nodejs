import {MigrationInterface, QueryRunner} from "typeorm";

export class completeEmployeeCrud1659418109273 implements MigrationInterface {
    name = 'completeEmployeeCrud1659418109273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "doj" TO "dateofjoining"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET DEFAULT 'No Role'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" SET DEFAULT 'Inactive'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "dateofjoining" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "dateofjoining" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "dateofjoining" TO "doj"`);
    }

}
