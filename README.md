# Work Progress Tracker

A modern web application for tracking work progress, built with Next.js, React, Material UI, Apollo Client, and GraphQL.

## Tech Stack

- **Frontend**: Next.js 14 with React 18
- **UI Framework**: Material UI
- **State Management & API**: Apollo Client
- **API**: GraphQL
- **Database**: PostgreSQL
- **Authentication**: Authentik (SSO)

## Prerequisites

- Node.js 18.x or later
- PostgreSQL 12 or later
- Authentik instance for SSO

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
   NEXT_PUBLIC_AUTHENTIK_URL=your-authentik-url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # Reusable React components
├── lib/             # Utility functions and configurations
├── graphql/         # GraphQL queries and mutations
└── types/           # TypeScript type definitions
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
