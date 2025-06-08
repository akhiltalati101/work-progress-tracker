import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Job } from './Job';
import { Goal } from './Goal';
import { AccomplishmentType } from './AccomplishmentType';

@Entity('accomplishments')
export class Accomplishment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'job_id' })
    jobId: string;

    @Column({ name: 'goal_id', nullable: true })
    goalId: string;

    @Column({ type: 'date', nullable: true })
    date: Date;

    @Column({ type: 'text', nullable: true })
    accomplishment: string;

    @Column({ type: 'text', nullable: true })
    impact: string;

    @Column({ type: 'text', nullable: true })
    recognition: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ name: 'type_id', nullable: true })
    typeId: string;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'To Do',
        enum: ['To Do', 'In Progress', 'Completed']
    })
    state: 'To Do' | 'In Progress' | 'Completed';

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => Job, job => job.accomplishments)
    job: Job;

    @ManyToOne(() => Goal, goal => goal.accomplishments)
    goal: Goal;

    @ManyToOne(() => AccomplishmentType, type => type.accomplishments)
    type: AccomplishmentType;
} 