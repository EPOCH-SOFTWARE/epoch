# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Epoch is the Next.js 15 marketing site for EPOCH Software Services, an AI-first engineering company. The homepage pairs editorial typography with the Epoch Field, a canvas animation of a training pass reaching every node of a network.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture & Structure

### Core Technologies
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **CSS Modules** for all styling (design tokens in `app/globals.css`; Tailwind is installed but not used)
- **Canvas API** for complex animations

### Key Directories
- `app/` - Next.js App Router routes, root layout (header, footer, fonts) and `globals.css` design tokens
- `src/components/pages/` - one component per page (home, services, clients, about, contact)
- `src/components/ui/` - shared building blocks (`ActionLink`, `ClientMark`, `ServiceList`, `CaseStudyCard`, `OfficeList`)
- `src/components/sections/` - shared page endings (`ClosingSection`, `NotFoundSection`)
- `src/components/field/` - the Epoch Field canvas animation
- `src/shared/constants/` - all copy and data (services, case studies, client logos, contact details)
- `src/shared/types/` - shared TypeScript types
- `styles/` - CSS Modules; `Primitives.module.css` holds the shared layout and type primitives

### Component Architecture

**Homepage (`src/components/pages/home/index.tsx`)**
- Hero statement ("All in. Every project. Every time.") over the Epoch Field
- Client logo plates, the "epoch" standard, commitments, AI services, selected work, closing invitation

**Epoch Field (`src/components/field/`)**
- A layered network that a training pass sweeps through each epoch; the readout shows epoch and loss
- `fieldModel.ts` (pure, unit-tested), `drawField.ts` (stateless canvas drawing), `fieldLoop.ts` (timing, sizing, pointer)
- Pauses off screen and in background tabs, 30fps on small screens, static frame for reduced motion

### State Management
- React's built-in `useState` and `useEffect` only; most pages are server components
- Client components: `Header` (mobile menu), `EpochField`, `ContactForm`

### Positioning
- AI-first: services are grouped into an AI tier and an "Engineering that makes AI real" tier (`services.ts`)
- Never invent client metrics or testimonials; testimonials render only when real ones exist

### TypeScript Configuration
- Strict TypeScript setup with path aliases (`@/*` maps to root)
- Shared types centralized in `src/shared/types/index.ts`

## Design Philosophy

### Core Design Principles
**Evoke Curiosity and Wonder**: The design should feel like discovering a new scientific principle - mysterious yet comprehensible, complex yet elegant. Every interaction should spark curiosity about what lies beneath the surface.

**Scientific Discovery Aesthetic**: Design as if documenting a groundbreaking physical phenomenon. Think particle physics visualizations, quantum field interactions, and the moment of scientific breakthrough rather than conventional web patterns.

**Pure Creativity Over Conventions**: Abandon traditional website conventions entirely. Design from first principles as if the web interface is a new medium for scientific exploration. Avoid referencing existing websites or following established patterns.

**Aesthetic Beauty**: Prioritize visual harmony that pleases the senses. Every element should contribute to an overall sense of beauty - from the mathematics of spacing to the physics of motion to the chemistry of color interactions.

**Intuitive Wonder**: While breaking conventions, maintain intuitive usability. Users should feel guided by natural curiosity rather than confused by complexity.

## Development Guidelines

### Performance Considerations
- Canvas animations are optimized for mobile devices (reduced particle counts, lower FPS)
- Animation frame throttling implemented for smooth performance
- Component memoization used where appropriate

### Creative Implementation Approach
- Use scientific metaphors in animations (quantum fields, particle interactions, gravitational effects)
- Implement unconventional but intuitive navigation patterns
- Create visual hierarchies based on scientific principles rather than web conventions
- Design interactions that feel like controlling natural phenomena

### Styling Approach
- CSS Modules for component-specific styles
- Custom CSS properties for theme consistency
- Responsive design with mobile-first approach
- Mathematical precision in spacing and proportions
- Color palettes inspired by scientific phenomena

### Component Patterns
- Functional components with hooks
- Proper TypeScript typing for all props and state
- Memoization for expensive calculations and renders
- Clean separation of concerns between logic and presentation