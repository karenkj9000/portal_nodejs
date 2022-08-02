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
  @Column({ nullable: false, default: "No Role" })
  public role: string;
  @Column({ nullable: false, default: "Inactive" })
  public status: string;
  @Column({ nullable: false, default: 0 })
  public experience: number;
  @Column({ nullable: true })
  public dateofjoining: string;
  @Column({ nullable: false })
  public username: string;
  @Column({ nullable: false })
  public password: string;
  @Column({ nullable: false, default: 0 })
  public age: number;

  @ManyToOne(() => Department, { cascade: true })
  @JoinColumn()
  public department: Department;
  @Column({ nullable: false })
  public departmentId: string;
}
