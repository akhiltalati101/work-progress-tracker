import { AppDataSource } from '../db/connection';
import { User } from '../entities/User';
import { Job } from '../entities/Job';
import { Goal } from '../entities/Goal';
import { Accomplishment } from '../entities/Accomplishment';
import { AccomplishmentType } from '../entities/AccomplishmentType';

export const resolvers = {
    Query: {
        // User queries
        user: async (_: any, { id }: { id: string }) => {
            return await AppDataSource.getRepository(User).findOne({ where: { id } });
        },
        users: async () => {
            return await AppDataSource.getRepository(User).find();
        },
        currentUser: async (_: any, __: any, { user }: { user: any }) => {
            if (!user) return null;
            return await AppDataSource.getRepository(User).findOne({ where: { id: user.id } });
        },

        // Job queries
        job: async (_: any, { id }: { id: string }) => {
            return await AppDataSource.getRepository(Job).findOne({ where: { id } });
        },
        jobs: async (_: any, { userId }: { userId: string }) => {
            return await AppDataSource.getRepository(Job).find({ where: { user_id: userId } });
        },

        // Goal queries
        goal: async (_: any, { id }: { id: string }) => {
            return await AppDataSource.getRepository(Goal).findOne({ where: { id } });
        },
        goals: async (_: any, { jobId }: { jobId: string }) => {
            return await AppDataSource.getRepository(Goal).find({ where: { job_id: jobId } });
        },

        // Accomplishment queries
        accomplishment: async (_: any, { id }: { id: string }) => {
            return await AppDataSource.getRepository(Accomplishment).findOne({ where: { id } });
        },
        accomplishments: async (_: any, { jobId, goalId }: { jobId: string, goalId?: string }) => {
            const where: any = { job_id: jobId };
            if (goalId) where.goal_id = goalId;
            return await AppDataSource.getRepository(Accomplishment).find({ where });
        },
        accomplishmentTypes: async () => {
            return await AppDataSource.getRepository(AccomplishmentType).find();
        },
    },

    Mutation: {
        // User mutations
        createUser: async (_: any, { input }: { input: any }) => {
            const user = AppDataSource.getRepository(User).create(input);
            return await AppDataSource.getRepository(User).save(user);
        },
        updateUser: async (_: any, { id, input }: { id: string, input: any }) => {
            await AppDataSource.getRepository(User).update(id, input);
            return await AppDataSource.getRepository(User).findOne({ where: { id } });
        },
        deleteUser: async (_: any, { id }: { id: string }) => {
            const result = await AppDataSource.getRepository(User).delete(id);
            return result.affected !== 0;
        },

        // Job mutations
        createJob: async (_: any, { input }: { input: any }) => {
            const job = AppDataSource.getRepository(Job).create(input);
            return await AppDataSource.getRepository(Job).save(job);
        },
        updateJob: async (_: any, { id, input }: { id: string, input: any }) => {
            await AppDataSource.getRepository(Job).update(id, input);
            return await AppDataSource.getRepository(Job).findOne({ where: { id } });
        },
        deleteJob: async (_: any, { id }: { id: string }) => {
            const result = await AppDataSource.getRepository(Job).delete(id);
            return result.affected !== 0;
        },

        // Goal mutations
        createGoal: async (_: any, { input }: { input: any }) => {
            const goal = AppDataSource.getRepository(Goal).create(input);
            return await AppDataSource.getRepository(Goal).save(goal);
        },
        updateGoal: async (_: any, { id, input }: { id: string, input: any }) => {
            await AppDataSource.getRepository(Goal).update(id, input);
            return await AppDataSource.getRepository(Goal).findOne({ where: { id } });
        },
        deleteGoal: async (_: any, { id }: { id: string }) => {
            const result = await AppDataSource.getRepository(Goal).delete(id);
            return result.affected !== 0;
        },

        // Accomplishment mutations
        createAccomplishment: async (_: any, { input }: { input: any }) => {
            const accomplishment = AppDataSource.getRepository(Accomplishment).create(input);
            return await AppDataSource.getRepository(Accomplishment).save(accomplishment);
        },
        updateAccomplishment: async (_: any, { id, input }: { id: string, input: any }) => {
            await AppDataSource.getRepository(Accomplishment).update(id, input);
            return await AppDataSource.getRepository(Accomplishment).findOne({ where: { id } });
        },
        deleteAccomplishment: async (_: any, { id }: { id: string }) => {
            const result = await AppDataSource.getRepository(Accomplishment).delete(id);
            return result.affected !== 0;
        },
    },

    // Field resolvers for relationships
    User: {
        jobs: async (parent: User) => {
            return await AppDataSource.getRepository(Job).find({ where: { user_id: parent.id } });
        },
    },
    Job: {
        goals: async (parent: Job) => {
            return await AppDataSource.getRepository(Goal).find({ where: { job_id: parent.id } });
        },
        accomplishments: async (parent: Job) => {
            return await AppDataSource.getRepository(Accomplishment).find({ where: { job_id: parent.id } });
        },
    },
    Goal: {
        accomplishments: async (parent: Goal) => {
            return await AppDataSource.getRepository(Accomplishment).find({ where: { goal_id: parent.id } });
        },
    },
    Accomplishment: {
        type: async (parent: Accomplishment) => {
            if (!parent.type_id) return null;
            return await AppDataSource.getRepository(AccomplishmentType).findOne({ where: { id: parent.type_id } });
        },
    },
}; 