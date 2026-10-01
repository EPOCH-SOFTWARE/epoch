/**
 * @fileoverview About page: what EPOCH believes, how an engagement runs, where the team is.
 * @author Epoch Development Team
 */

import { ClosingSection } from '../../sections/ClosingSection';
import { OfficeList } from '../../ui/OfficeList';
import techStackData from '../../../data/techStackData.json';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/AboutPage.module.css';

const BELIEFS = [
  {
    title: 'Serving the client is the whole job.',
    detail: 'Technology is how we do it. Your outcome is what we measure ourselves against.',
  },
  {
    title: 'Going further is the default.',
    detail: 'When the problem needs more than the plan, the plan changes. Not the standard.',
  },
  {
    title: "Commitment doesn't end at handoff.",
    detail:
      'We stay through launch, adoption and whatever comes after, with maintenance, optimization and new features.',
  },
  {
    title: 'Honesty over comfort.',
    detail: 'Honest estimates, early warnings and direct feedback. No surprises.',
  },
] as const;

const ENGAGEMENT_STEPS = [
  {
    title: 'Discovery & analysis',
    detail:
      'Every project starts with understanding your challenges, goals and constraints. We gather requirements thoroughly before proposing solutions.',
  },
  {
    title: 'Iterative development',
    detail:
      'We build in short cycles with continuous feedback. Working software arrives early and improves with real usage.',
  },
  {
    title: 'Quality assurance',
    detail: 'Automated testing, code reviews and structured QA before anything reaches production.',
  },
  {
    title: 'Ongoing support',
    detail:
      "Our engagement doesn't end at launch. Maintenance, optimization and new features keep your systems running well.",
  },
] as const;

function Hero() {
  return (
    <section aria-labelledby="about-title" className={styles.hero}>
      <div className={ui.container}>
        <h1 id="about-title" className={`${ui.display} ${styles.heroTitle}`}>
          We don&apos;t do half-in.
        </h1>
        <p className={`${ui.lede} ${styles.heroLede}`}>
          EPOCH is an AI and software engineering company with teams in the US and India. Every
          engagement gets our full commitment, from the first call to long after launch.
        </p>
      </div>
    </section>
  );
}

function Conviction() {
  return (
    <section aria-labelledby="conviction-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={`${ui.container} ${styles.split}`}>
        <h2 id="conviction-title" className={ui.heading}>
          Why it&apos;s all or nothing
        </h2>
        <div>
          <p className={ui.lede}>
            Most software problems aren&apos;t hard because of the technology. They&apos;re hard
            because someone stopped paying attention halfway through: a requirement that got
            skipped, an edge case nobody owned, a launch nobody stayed for.
          </p>
          <p className={`${ui.body} ${styles.followOn}`}>
            EPOCH exists to be the team that doesn&apos;t stop paying attention. We own outcomes,
            not tickets, and we stay until the work is done.
          </p>
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section aria-labelledby="beliefs-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="beliefs-title" className={styles.quietHeading}>
          What we believe
        </h2>
        <ul className={styles.beliefs}>
          {BELIEFS.map(belief => (
            <li key={belief.title} className={styles.belief}>
              <h3 className={styles.beliefTitle}>{belief.title}</h3>
              <p className={ui.body}>{belief.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Engagement() {
  return (
    <section aria-labelledby="engagement-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="engagement-title" className={ui.heading}>
          How an engagement runs
        </h2>
        <ol className={styles.steps}>
          {ENGAGEMENT_STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">
                {index + 1}
              </span>
              <h3 className={ui.subheading}>{step.title}</h3>
              <p className={ui.body}>{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Offices() {
  return (
    <section aria-labelledby="offices-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={`${ui.container} ${styles.split}`}>
        <h2 id="offices-title" className={ui.heading}>
          Where we are
        </h2>
        <div className={styles.officeList}>
          <OfficeList />
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section aria-labelledby="stack-title" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="stack-title" className={ui.heading}>
          What we build with
        </h2>
        <ul className={styles.stack}>
          {techStackData.techStack.map(category => (
            <li key={category.category} className={styles.stackRow}>
              <h3 className={styles.stackTitle}>{category.category}</h3>
              <ul className={styles.chips}>
                {category.technologies.map(technology => (
                  <li key={technology.name} className={styles.chip}>
                    {technology.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <Conviction />
      <Beliefs />
      <Engagement />
      <Offices />
      <Stack />
      <ClosingSection />
    </>
  );
}
