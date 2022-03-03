import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Users } from '../users/users.entity';
import { Items } from '../items/items.entity';

@Entity('folders')
export class Folders extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @ManyToOne(() => Users, (users) => users.folders)
  users: Users;

  @OneToMany(() => Items, (items) => items.folders)
  items: Items[];
}
