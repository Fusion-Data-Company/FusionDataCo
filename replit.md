# Fusion Data Co - Marketing Automation SaaS Platform

## Overview
A cutting-edge marketing automation SaaS platform that transforms lead generation into a strategic, data-driven conversion ecosystem. Built with React, Express.js, PostgreSQL, and AI-powered features.

## Recent Changes (January 20, 2025)
### New Services & Pricing Structure
- **Conversational AI Service Page**: Enhanced with voice/SMS agents using ElevenLabs + Vapi + OpenRouter
  - Phone agents with inbound/outbound capabilities
  - SMS nurture sequences with compliance
  - Industry-specific examples (Real Estate, Insurance, Healthcare, Finance)
  - Sandler funnel alignment (Pain → Info → Good News)
  
- **Multi-Model Agents (Golf Bag Approach)**: Strategic AI model selection
  - Driver = long-range generation
  - Irons = structured reasoning
  - Wedge = cleanup/extraction
  - Putter = final polish
  - OpenRouter integration for 100+ models

- **New Pricing Tiers**: Launch/Growth/Scale
  - Launch: $799/mo + $2k setup (1 agent, basic features)
  - Growth: $1,799/mo + $6k setup (3 agents, n8n, analytics) [Recommended]
  - Scale: $4,499/mo + $15k setup (unlimited agents, SLAs, enterprise features)
  - Add-ons: Additional numbers, voice clones, dashboards, workshops

## Project Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Express.js with TypeScript, Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: Google OAuth via Passport.js
- **AI Integration**: OpenRouter for multi-model routing, OpenAI API
- **Real-time**: WebSockets for live updates
- **Analytics**: Custom tracking system with GA-style events

### Key Features
- Conversational AI (Voice + SMS)
- Multi-model AI routing
- CRM integration capabilities
- Marketing automation workflows
- Social media management
- Email campaigns
- Lead generation tools
- Analytics dashboards
- Sandler funnel methodology

### Database Schema
- Users (with Google OAuth integration)
- Leads & Contacts
- Campaigns & Automations
- Analytics Events
- Sessions

### Security & Compliance
- SOC2 compliant infrastructure
- GDPR data protection
- TCPA/CTIA standards
- HIPAA-ready options
- Secure OAuth implementation
- Session management with PostgreSQL store

## Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Modular component architecture
- Consistent error handling
- Comprehensive logging

### Testing & Deployment
- Development workflow runs on port 5000
- HMR enabled for rapid development
- PostgreSQL database for persistence
- Ready for Replit Deployments

## User Preferences
- Enterprise-focused copy without hype
- Sandler sales methodology alignment
- Professional, credible tone for CTOs/VPs
- Cross-linking between all service pages
- Consistent UI with existing design system

## Support & Documentation
- Comprehensive FAQ sections
- Industry-specific examples
- Case study snippets with metrics
- Clear pricing transparency
- Enterprise standards highlighted