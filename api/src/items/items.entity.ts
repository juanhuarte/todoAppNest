import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Folders } from '../folders/folders.entity';

@Entity('items')
export class Items extends BaseEntity {
  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  status: boolean;

  @ManyToOne(() => Folders, (folders) => folders.items, { onDelete: 'CASCADE' })
  folders: Folders;
}
