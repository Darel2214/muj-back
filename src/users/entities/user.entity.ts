import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Alert } from '../../alerts/entities/alert.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  dni: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: 'ciudadana' })
  role: string;

  @OneToMany((type) => Alert, (alert) => alert.user)
  alerts: Alert[];

  @Column({ default: null, nullable: true })
  email: string;

  @Column({ default: null, nullable: true })
  resetKey: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
