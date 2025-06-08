import { gql } from 'graphql-tag';

export const typeDefs = gql`
    # User type
    type User {
        id: ID!
        authentik_user_id: String!
        email: String!
        full_name: String
        created_at: String!
        updated_at: String!
        jobs: [Job!]
    }

    # Job type
    type Job {
        id: ID!
        user_id: ID!
        company_name: String!
        role: String
        description: String
        created_at: String!
        updated_at: String!
        goals: [Goal!]
        accomplishments: [Accomplishment!]
    }

    # Goal type
    type Goal {
        id: ID!
        job_id: ID!
        title: String!
        brief_description: String
        notes: String
        created_at: String!
        updated_at: String!
        accomplishments: [Accomplishment!]
    }

    # Accomplishment type
    type AccomplishmentType {
        id: ID!
        name: String!
        created_at: String!
    }

    # Accomplishment type
    type Accomplishment {
        id: ID!
        job_id: ID!
        goal_id: ID
        date: String
        accomplishment: String
        impact: String
        recognition: String
        notes: String
        type_id: ID
        state: String!
        created_at: String!
        updated_at: String!
        type: AccomplishmentType
    }

    # Input types for mutations
    input CreateUserInput {
        authentik_user_id: String!
        email: String!
        full_name: String
    }

    input CreateJobInput {
        user_id: ID!
        company_name: String!
        role: String
        description: String
    }

    input CreateGoalInput {
        job_id: ID!
        title: String!
        brief_description: String
        notes: String
    }

    input CreateAccomplishmentInput {
        job_id: ID!
        goal_id: ID
        date: String
        accomplishment: String
        impact: String
        recognition: String
        notes: String
        type_id: ID
        state: String
    }

    # Query type
    type Query {
        # User queries
        user(id: ID!): User
        users: [User!]!
        currentUser: User

        # Job queries
        job(id: ID!): Job
        jobs(userId: ID!): [Job!]!

        # Goal queries
        goal(id: ID!): Goal
        goals(jobId: ID!): [Goal!]!

        # Accomplishment queries
        accomplishment(id: ID!): Accomplishment
        accomplishments(jobId: ID!, goalId: ID): [Accomplishment!]!
        accomplishmentTypes: [AccomplishmentType!]!
    }

    # Mutation type
    type Mutation {
        # User mutations
        createUser(input: CreateUserInput!): User!
        updateUser(id: ID!, input: CreateUserInput!): User!
        deleteUser(id: ID!): Boolean!

        # Job mutations
        createJob(input: CreateJobInput!): Job!
        updateJob(id: ID!, input: CreateJobInput!): Job!
        deleteJob(id: ID!): Boolean!

        # Goal mutations
        createGoal(input: CreateGoalInput!): Goal!
        updateGoal(id: ID!, input: CreateGoalInput!): Goal!
        deleteGoal(id: ID!): Boolean!

        # Accomplishment mutations
        createAccomplishment(input: CreateAccomplishmentInput!): Accomplishment!
        updateAccomplishment(id: ID!, input: CreateAccomplishmentInput!): Accomplishment!
        deleteAccomplishment(id: ID!): Boolean!
    }
`; 