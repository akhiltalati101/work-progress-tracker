import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Job } from './Job';
import { Accomplishment } from './Accomplishment';

@Entity('goals')
export class Goal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'job_id' })
    jobId: string;

    @Column({ length: 255 })
    title: string;

    @Column({ name: 'brief_description', type: 'text', nullable: true })
    briefDescription: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => Job, job => job.goals)
    job: Job;

    @OneToMany(() => Accomplishment, accomplishment => accomplishment.goal)
    accomplishments: Accomplishment[];
} 