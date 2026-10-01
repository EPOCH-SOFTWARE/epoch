/**
 * @fileoverview Service detail page: the problem, how we approach it, what we deliver,
 * and how an engagement runs.
 * @author Epoch Development Team
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { ActionLink } from '../../ui/ActionLink';
import { SERVICE_TIERS } from '../../../shared/constants/services';
import type { ServiceDetailData } from '../../../shared/constants/serviceData';
import type { ServiceSummary } from '../../../shared/types';
import ui from '../../../../styles/Primitives.module.css';
import styles from '../../../../styles/ServiceDetail.module.css';

interface ServiceDetailPageProps {
  readonly service: ServiceDetailData;
  readonly summary: ServiceSummary;
}

interface SplitSectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}

function SplitSection({ id, title, children }: SplitSectionProps) {
  return (
    <section aria-labelledby={id} className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={`${ui.container} ${styles.split}`}>
        <h2 id={id} className={styles.sectionTitle}>
          {title}
        </h2>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}

function Hero({ service, summary }: ServiceDetailPageProps) {
  const tier = SERVICE_TIERS.find(candidate => candidate.id === summary.tier);

  return (
    <section aria-labelledby="service-title" className={styles.hero}>
      <div className={ui.container}>
        <nav aria-label="Breadcrumb">
          <ol className={styles.trail}>
            <li>
              <Link href="/services" className={styles.trailLink}>
                All services
              </Link>
            </li>
            {tier && (
              <li>
                <Link href={`/services#tier-${tier.id}`} className={styles.trailLink}>
                  {tier.title}
                </Link>
              </li>
            )}
          </ol>
        </nav>
        <h1 id="service-title" className={`${ui.display} ${styles.title}`}>
          {summary.title}
        </h1>
        <div className={styles.heroFooter}>
          <p className={ui.lede}>{service.heroDescription}</p>
          <div className={ui.actions}>
            <ActionLink href="/contact">{service.ctaButtonText}</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  const { title, description, painPoints } = service.problemStatement;
  return (
    <SplitSection id="problem" title={title}>
      <p className={ui.lede}>{description}</p>
      <ul className={styles.points}>
        {painPoints.map(point => (
          <li key={point} className={styles.point}>
            {point}
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}

function Approach({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  const { overview, expertise } = service;
  return (
    <SplitSection id="approach" title={overview.title}>
      <p className={ui.lede}>{overview.description}</p>
      <div>
        {overview.keyPoints.map(point => (
          <p key={point} className={ui.body}>
            {point}
          </p>
        ))}
      </div>
      <h3 className={styles.subTitle}>{expertise.title}</h3>
      <p className={ui.body}>{expertise.description}</p>
      <ul className={styles.skills}>
        {expertise.skills.map(skill => (
          <li key={skill.name} className={styles.skill}>
            <h4 className={styles.skillName}>{skill.name}</h4>
            <p className={ui.body}>{skill.description}</p>
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}

function Deliverables({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <section aria-labelledby="deliver" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="deliver" className={`${styles.sectionTitle} ${styles.rowsTitle}`}>
          What we deliver
        </h2>
        <ul className={styles.rows}>
          {service.keyServices.map(offering => (
            <li key={offering.title} className={styles.row}>
              <h3 className={styles.rowTitle}>{offering.title}</h3>
              <p className={styles.rowDescription}>{offering.description}</p>
              <p className={styles.rowMeta}>{offering.features.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Process({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <SplitSection id="process" title={service.process.title}>
      <ol className={styles.steps}>
        {service.process.steps.map(step => (
          <li key={step.step} className={styles.step}>
            <span className={styles.stepNumber} aria-hidden="true">
              {step.step}
            </span>
            <div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={ui.body}>{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}

function Industries({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <SplitSection id="industries" title="Industries">
      <dl className={styles.industries}>
        {service.industries.map(industry => (
          <div key={industry.name} className={styles.industry}>
            <dt className={styles.industryName}>{industry.name}</dt>
            <dd className={ui.muted}>{industry.applications.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </SplitSection>
  );
}

function WhyEpoch({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <SplitSection id="why-epoch" title="Why EPOCH">
      <ul className={styles.points}>
        {service.whyEpoch.map(reason => (
          <li key={reason} className={`${styles.point} ${styles.reason}`}>
            {reason}
          </li>
        ))}
      </ul>
    </SplitSection>
  );
}

function Questions({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <SplitSection id="questions" title="Questions">
      <div className={styles.faqs}>
        {service.faqs.map(faq => (
          <details key={faq.question} className={styles.faq}>
            <summary className={styles.question}>{faq.question}</summary>
            <p className={`${ui.body} ${styles.answer}`}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </SplitSection>
  );
}

function CallToAction({ service }: Pick<ServiceDetailPageProps, 'service'>) {
  return (
    <section aria-labelledby="service-cta" className={`${ui.section} ${ui.sectionRuled}`}>
      <div className={ui.container}>
        <h2 id="service-cta" className={`${ui.display} ${styles.ctaTitle}`}>
          {service.ctaTitle}
        </h2>
        <div className={styles.ctaFooter}>
          <p className={ui.lede}>{service.ctaDescription}</p>
          <div className={ui.actions}>
            <ActionLink href="/contact">{service.ctaButtonText}</ActionLink>
            <ActionLink href="/services" variant="secondary">
              All services
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceDetailPage({ service, summary }: ServiceDetailPageProps) {
  return (
    <>
      <Hero service={service} summary={summary} />
      <Problem service={service} />
      <Approach service={service} />
      <Deliverables service={service} />
      <Process service={service} />
      <Industries service={service} />
      <WhyEpoch service={service} />
      <Questions service={service} />
      <CallToAction service={service} />
    </>
  );
}
