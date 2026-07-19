import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('jobs')
@Index(['userId'])
@Index(['stage'])
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar' })
  position: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  jobUrl: string;

  @Column({
    type: 'varchar',
    enum: ['applied', 'interviewed', 'offer', 'rejected', 'ghosted'],
    default: 'applied',
  })
  stage: string;

  @Column({ type: 'varchar', nullable: true })
  salary: string;

  @Column({ type: 'timestamp', nullable: true })
  appliedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
