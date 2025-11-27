import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { LinkModel } from "./link";

@Entity()
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  password?: string;

  @OneToMany(() => LinkModel, (link) => link.user)
  links!: LinkModel[];
}
