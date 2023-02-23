/*
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Resume } from "./Resume.js";

@Entity('hobby')
export class Hobby {
  @Column({type: "number"})
  id

  @Column({type: "varchar"})
  name

  @ManyToMany(() => Resume, (resume) => resume.hobbies)
  resumes

  @CreateDateColumn()
  createdAt

  @UpdateDateColumn()
  updatedAt
}*/
