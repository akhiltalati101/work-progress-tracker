import { gql } from '@apollo/client';

// User queries
export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            authentik_user_id
            email
            full_name
            created_at
            updated_at
            jobs {
                id
                company_name
                role
                description
            }
        }
    }
`;

export const GET_CURRENT_USER = gql`
    query GetCurrentUser {
        currentUser {
            id
            authentik_user_id
            email
            full_name
            created_at
            updated_at
            jobs {
                id
                company_name
                role
                description
            }
        }
    }
`;

// Job queries
export const GET_JOB = gql`
    query GetJob($id: ID!) {
        job(id: $id) {
            id
            user_id
            company_name
            role
            description
            created_at
            updated_at
            goals {
                id
                title
                brief_description
            }
            accomplishments {
                id
                date
                accomplishment
                impact
                recognition
                state
            }
        }
    }
`;

export const GET_JOBS = gql`
    query GetJobs($userId: ID!) {
        jobs(userId: $userId) {
            id
            company_name
            role
            description
            created_at
            updated_at
        }
    }
`;

// Goal queries
export const GET_GOAL = gql`
    query GetGoal($id: ID!) {
        goal(id: $id) {
            id
            job_id
            title
            brief_description
            notes
            created_at
            updated_at
            accomplishments {
                id
                date
                accomplishment
                impact
                recognition
                state
            }
        }
    }
`;

export const GET_GOALS = gql`
    query GetGoals($jobId: ID!) {
        goals(jobId: $jobId) {
            id
            title
            brief_description
            notes
            created_at
            updated_at
        }
    }
`;

// Accomplishment queries
export const GET_ACCOMPLISHMENT = gql`
    query GetAccomplishment($id: ID!) {
        accomplishment(id: $id) {
            id
            job_id
            goal_id
            date
            accomplishment
            impact
            recognition
            notes
            type_id
            state
            created_at
            updated_at
            type {
                id
                name
            }
        }
    }
`;

export const GET_ACCOMPLISHMENTS = gql`
    query GetAccomplishments($jobId: ID!, $goalId: ID) {
        accomplishments(jobId: $jobId, goalId: $goalId) {
            id
            date
            accomplishment
            impact
            recognition
            notes
            state
            type {
                id
                name
            }
        }
    }
`;

export const GET_ACCOMPLISHMENT_TYPES = gql`
    query GetAccomplishmentTypes {
        accomplishmentTypes {
            id
            name
        }
    }
`; 