import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Job } from './Job';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'authentik_user_id', length: 255, unique: true })
    authentikUserId: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ name: 'full_name', length: 255, nullable: true })
    fullName: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date;

    @OneToMany(() => Job, job => job.user)
    jobs: Job[];
} 