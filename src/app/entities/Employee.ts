import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";

@Entity("employee")
export class Employee extends AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
  @Column({ nullable: false })
  public name: string;
  @Column({ nullable: false })
  public role: string;
  @Column({ nullable: false })
  public status: string;
  @Column({ nullable: false })
  public experience: string;
  @Column({ nullable: false })
  public doj: string;

  @ManyToOne(() => Department, { cascade: true })
  @JoinColumn()
  public department: Department;
  @Column({ nullable: false })
  public departmentId: string;
}
