import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Folders } from '../folders/folders.entity';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  mail: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @OneToMany(() => Folders, (folders) => folders.users)
  folders: Folders[];
}
