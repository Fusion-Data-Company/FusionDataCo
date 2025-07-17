# Fusion Data Co Marketing Automation Platform

## Overview

This repository contains the codebase for a marketing automation platform called "Fusion Data Co". It's a full-stack web application built with a React frontend and Express backend, using a PostgreSQL database with Drizzle ORM. The platform aims to provide small businesses with marketing automation tools, CRM capabilities, website building, and AI-powered workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-server architecture:

1. **Frontend**: React application with TypeScript, Vite for build tooling, and TailwindCSS for styling
2. **Backend**: Express.js server with TypeScript
3. **Database**: PostgreSQL with Drizzle ORM for data access
4. **State Management**: React Query for server state management
5. **UI Component Library**: Custom UI components leveraging Radix UI primitives and Shadcn/UI implementation patterns

The application is designed to run both locally for development and can be deployed via Replit's deployment system.

## Key Components

### Frontend Components

1. **Pages**: The application has multiple industry-specific pages (SmallBusiness, RealEstate, Medical, HomeServices, SocialMediaServices) as well as a Pricing page
2. **UI Components**: Extensive UI component library built with Radix UI primitives and styled with TailwindCSS
3. **Theme Provider**: Custom theme provider with light/dark mode support
4. **API Integration**: React Query is used to manage API requests and server state

### Backend Components

1. **Express Server**: Handles API requests and serves the frontend
2. **Routes**: API routes for contact form submissions and chat functionality 
3. **Storage**: Database interaction layer for persisting data
4. **Schema**: Database schema defined with Drizzle ORM and Zod for validation

### Database Schema

The database has three main tables:
1. **users**: Stores user information including username, password, email, etc.
2. **contact_submissions**: Stores contact form submissions
3. **chat_messages**: Stores chat conversations with the AI assistant

## Data Flow

1. **Contact Form Submission**:
   - User fills out a contact form on the frontend
   - Form is validated with Zod schemas
   - Data is sent to `/api/contact` endpoint
   - Backend validates the data again and stores it in the database
   - Response is sent back to the frontend

2. **Chat Interaction**:
   - User sends a message via the chat interface
   - Message is sent to `/api/chat` endpoint
   - Backend processes the message, potentially using AI
   - Response is stored in the database and returned to the frontend

## External Dependencies

### Frontend Dependencies

1. **React & React DOM**: Core library for UI
2. **Wouter**: Lightweight router for navigation
3. **TailwindCSS**: Utility-first CSS framework
4. **Radix UI**: Unstyled, accessible UI primitives
5. **Lucide React**: Icon library
6. **React Query**: Data fetching and state management
7. **React Hook Form**: Form handling with validation via Zod

### Backend Dependencies

1. **Express**: Web server framework
2. **Drizzle ORM**: Database ORM for PostgreSQL
3. **Zod**: Schema validation
4. **Nanoid**: Unique ID generation

## Deployment Strategy

The application is configured to be deployed on Replit:

1. **Development**: `npm run dev` starts both the Vite development server and the Express backend
2. **Production Build**: `npm run build` builds both the frontend and backend into the `dist` directory
3. **Production Start**: `npm run start` runs the production build

The `.replit` configuration file defines the necessary settings for the Replit environment, including the required modules (nodejs-20, web, postgresql-16) and deployment settings.

## Getting Started

1. The application requires a PostgreSQL database connection configured via the `DATABASE_URL` environment variable
2. Install dependencies with `npm install`
3. Run database migrations with `npm run db:push`
4. Start the development server with `npm run dev`

## Future Considerations

1. **Authentication**: Currently there's a user schema but no full authentication system implemented
2. **AI Integration**: The chat functionality is set up but may need further integration with AI services
3. **Additional Industry Pages**: More industry-specific solutions can be added
4. **Enhanced CRM Features**: The database schema supports users but could be extended for more CRM functionality
5. **Social Media Integration**: The UI shows social media capabilities that need to be fully implemented on the backend
