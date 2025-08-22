# Fusion Data Co - Marketing Automation SaaS Platform

## Overview

Fusion Data Co is a comprehensive marketing automation SaaS platform that transforms lead generation into a strategic, data-driven conversion ecosystem. The platform combines enterprise-grade CRM functionality, AI-powered conversational agents, automated marketing workflows, and advanced analytics to help businesses streamline operations and accelerate growth.

Key capabilities include:
- Conversational AI with voice synthesis (ElevenLabs) and telephony integration (Vapi)
- Multi-model AI routing through OpenRouter for optimal response generation
- N8N workflow automation and custom integrations
- White-label CRM with PostgreSQL backend
- Social media automation and content generation
- Enterprise compliance and security features

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight, declarative routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: Shadcn/ui components with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system and dark theme support
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for RESTful API endpoints
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Shared TypeScript schemas between frontend and backend
- **API Structure**: Modular router system with separate routes for marketing, CRM, and authentication
- **File Organization**: Monorepo structure with separate client/server/shared directories

### Authentication System
- **Primary**: Replit Auth integration for admin panel access only
- **Session Management**: PostgreSQL-backed sessions with connect-pg-simple
- **Authorization**: Role-based access control with admin route protection
- **Fallback**: Local storage mock authentication for development

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Design**: Comprehensive tables for users, contacts, CRM data, marketing campaigns, and chat messages
- **Data Validation**: Zod schemas for runtime type checking and validation
- **Migrations**: Drizzle Kit for database schema management and migrations

### AI and Automation Features
- **Conversational AI**: OpenRouter integration for multi-model AI responses using Perplexity Sonar
- **Voice Technology**: ElevenLabs voice synthesis for realistic phone interactions
- **Content Generation**: AI-powered social media content creation and email templates
- **Workflow Automation**: N8N integration for complex business process automation

### Form Processing Architecture
- **Contact Forms**: Centralized submission handling with multiple form types (contact, newsletter, CRM demo, industry-specific)
- **Data Flow**: Frontend validation → API submission → PostgreSQL storage → Analytics tracking
- **Error Handling**: Comprehensive validation with user-friendly error messages

## External Dependencies

### Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **OpenRouter.io**: Multi-model AI routing service for conversational responses
- **ElevenLabs**: Voice synthesis API for realistic voice generation
- **Vapi**: Telephony integration for voice-based customer interactions
- **Notion API**: Content management and knowledge base integration

### Development Tools
- **Replit**: Primary development environment with built-in authentication
- **Drizzle Kit**: Database schema management and migration tool
- **ESBuild**: Fast bundling for production server builds
- **TypeScript**: Type safety across the entire stack

### UI and Design Dependencies
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for enhanced user experience
- **React Hook Form**: Form handling with validation support

### Analytics and Tracking
- **Google Analytics**: Event tracking for user interactions and conversions
- **Custom Analytics**: Internal tracking system for lead generation and CRM activities

### Security and Compliance
- **CORS**: Cross-origin resource sharing configuration
- **Environment Variables**: Secure configuration management
- **Session Security**: HTTPOnly cookies with secure flags
- **Rate Limiting**: API protection against abuse

The system follows a modern, scalable architecture with clear separation of concerns, comprehensive error handling, and enterprise-grade security features suitable for B2B SaaS operations.