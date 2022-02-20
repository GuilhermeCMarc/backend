import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./Base";
import { Task } from "./Task";

@Entity()
export class User extends Base {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];
}
