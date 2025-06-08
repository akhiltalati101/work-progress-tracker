import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Goal } from './Goal';
import { Accomplishment } from './Accomplishment';

@Entity('jobs')
export class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'company_name', length: 255 })
    companyName: string;

    @Column({ length: 255, nullable: true })
    role: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @ManyToOne(() => User, user => user.jobs)
    user: User;

    @OneToMany(() => Goal, goal => goal.job)
    goals: Goal[];

    @OneToMany(() => Accomplishment, accomplishment => accomplishment.job)
    accomplishments: Accomplishment[];
} 