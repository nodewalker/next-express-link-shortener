import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserModel } from "./user";

@Entity()
export class LinkModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  long!: string;

  @ManyToOne(() => UserModel, (user) => user.links)
  user?: UserModel;
}
