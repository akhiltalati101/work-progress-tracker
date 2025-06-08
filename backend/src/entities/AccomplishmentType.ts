import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Accomplishment } from './Accomplishment';

@Entity('accomplishment_types')
export class AccomplishmentType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100, unique: true })
    name: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @OneToMany(() => Accomplishment, accomplishment => accomplishment.type)
    accomplishments: Accomplishment[];
} 