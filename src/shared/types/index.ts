/**
 * @fileoverview Core type definitions for the Epoch application
 * @author Epoch Development Team
 */

export type ServiceTier = 'ai' | 'engineering';

export interface ServiceSummary {
  readonly id: string;
  readonly tier: ServiceTier;
  readonly title: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

export interface ClientLogo {
  readonly id: string;
  readonly name: string;
  /** Path under /public. Clients without a logo file render as a wordmark. */
  readonly logo?: string;
}

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly position: string;
}

export interface CaseStudyResult {
  readonly metric: string;
  readonly before: string;
  readonly after: string;
  readonly improvement: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly name: string;
  readonly logo: string;
  /** One-line description of what EPOCH built, used as the page heading and on cards. */
  readonly headline: string;
  readonly summary: string;
  readonly industry: string;
  readonly companySize: string;
  readonly timeline: string;
  readonly teamSize: { readonly epoch: number; readonly client: number };
  readonly generalChallenges: readonly string[];
  readonly whyChoseEpoch: string;
  readonly projectScope: string;
  readonly workingProcess: {
    readonly communicationTools: readonly string[];
    readonly meetingFrequency: string;
    readonly methodology: string;
  };
  readonly teamRoles: {
    readonly epochRoles: readonly string[];
    readonly clientRoles: readonly string[];
  };
  readonly challengesOvercome: readonly string[];
  readonly deliverables: readonly string[];
  readonly technicalHighlights: readonly string[];
  readonly technologies: readonly string[];
  readonly innovativeFeatures: readonly string[];
  readonly quantifiableResults: readonly CaseStudyResult[];
  readonly qualitativeResults: readonly string[];
  /** Omitted until the client provides a real quote. */
  readonly testimonial?: Testimonial;
  /** Ids from the service catalog. */
  readonly relatedServices: readonly string[];
  readonly metaTitle: string;
  readonly metaDescription: string;
}
