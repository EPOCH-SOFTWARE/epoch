# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Epoch is a Next.js 15 application showcasing a software development company's portfolio. The project features a sophisticated homepage with advanced animations, custom Canvas-based wormhole effects, and a modern component architecture.

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
- **Tailwind CSS 4** for styling
- **CSS Modules** for component-specific styles
- **Canvas API** for complex animations

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `constants/` - Application constants and configuration
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks
- `styles/` - CSS modules and global styles

### Component Architecture

**EpochHomepage (`components/EpochHomepage.tsx`)**
- Main homepage component with complex animation logic
- Features custom Canvas-based wormhole animation with performance optimizations
- Implements scroll-based section tracking and mouse parallax effects
- Uses CSS modules for styling (`styles/EpochHomepage.module.css`)

**Key Features:**
- Performance-optimized Canvas animations (reduced FPS and particle count on mobile)
- Responsive design with mobile-specific optimizations
- Complex gradient mesh backgrounds and particle systems
- Scroll-triggered animations and section visibility

### State Management
- Uses React's built-in `useState` and `useEffect` for local component state
- Custom hooks for reusable logic (e.g., `useCursor` for cursor effects)
- No external state management library

### Animation System
- Canvas-based animations for complex visual effects
- CSS-based animations with custom properties for timing
- Performance optimizations including frame throttling and reduced complexity on mobile
- Mouse tracking for parallax and interactive effects

### TypeScript Configuration
- Strict TypeScript setup with path aliases (`@/*` maps to root)
- Custom interfaces for component props and animation configurations
- Type definitions centralized in `types/index.ts`

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
- Tailwind CSS for utility classes and global styles
- Custom CSS properties for theme consistency
- Responsive design with mobile-first approach
- Mathematical precision in spacing and proportions
- Color palettes inspired by scientific phenomena

### Component Patterns
- Functional components with hooks
- Proper TypeScript typing for all props and state
- Memoization for expensive calculations and renders
- Clean separation of concerns between logic and presentation