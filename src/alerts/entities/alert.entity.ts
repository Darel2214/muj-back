import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  lat: string;

  @Column({ nullable: false })
  lng: string;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => User, (user) => user.alerts)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
