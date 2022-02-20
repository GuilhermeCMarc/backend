import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Base } from "./Base";
import { User } from "./User";

@Entity()
export class Task extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  owner: User;

  @OneToMany(() => Task, (task) => task.parent)
  subTasks: Task[];

  @ManyToOne(() => Task, (task) => task.subTasks, { onDelete: "CASCADE" })
  parent: Task;
}
