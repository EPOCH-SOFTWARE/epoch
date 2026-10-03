'use client';
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { CaseStudy } from '@/src/shared/types';
import { SERVICES } from '@/src/shared/constants/services';
import { GOALS } from './content';

function useTabs(count: number, initial: number, onSelect?: (index: number) => void) {
  const [active, setActive] = useState(initial);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function select(index: number) {
    setActive(index);
    onSelect?.(index);
  }
  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % count;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    buttons.current[next]?.focus();
  }
  return { active, select, onKeyDown, buttons, setActive };
}
export function GoalExplorer() {
  const { active, select, onKeyDown, buttons, setActive } = useTabs(GOALS.length, 0, index => {
    const url = new URL(location.href);
    url.searchParams.set('goal', GOALS[index]!.id);
    history.replaceState(null, '', url);
  });
  useEffect(() => {
    const goal = new URLSearchParams(location.search).get('goal');
    const index = GOALS.findIndex(g => g.id === goal);
    setActive(index < 0 ? 0 : index);
  }, [setActive]);
  return (
    <div data-goal-explorer="" id="explore" className="goal-layout">
      <div
        className="goal-choices"
        role="tablist"
        aria-label="Your project goal"
        aria-orientation="vertical"
      >
        {GOALS.map((goal, i) => (
          <button
            ref={node => {
              buttons.current[i] = node;
            }}
            key={goal.id}
            className="goal-choice"
            type="button"
            id={'goal-' + goal.id}
            role="tab"
            aria-controls={'goal-panel-' + goal.id}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            {goal.title}
          </button>
        ))}
      </div>
      <div className="goal-content">
        {GOALS.map((goal, i) => (
          <div
            key={goal.id}
            className="goal-panel"
            id={'goal-panel-' + goal.id}
            role="tabpanel"
            aria-labelledby={'goal-' + goal.id}
            tabIndex={0}
            hidden={i !== active}
          >
            <h3>{goal.headline}</h3>
            <p className="goal-description">{goal.description}</p>
            <ol className="goal-stages">
              {goal.stages.map(stage => (
                <li key={stage}>{stage}</li>
              ))}
            </ol>
            <div className="goal-capabilities">
              <p>What comes together</p>
              <ul className="goal-links">
                {goal.capabilities.map(id => (
                  <li key={id}>
                    <a href={'/services/' + id}>{SERVICES.find(s => s.id === id)!.title}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="goal-foot">
              <p>{goal.question}</p>
              <a className="btn" href={'/contact?goal=' + goal.id + '#message'}>
                Talk through this project
              </a>
              <a
                className="goal-proof"
                href={
                  '/work/' + (goal.id === 'modernise' ? 'inspira-financial' : 'hub-international')
                }
              >
                {goal.id === 'modernise'
                  ? 'Explore the Inspira project'
                  : 'Explore the HUB project'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function ScopeExplorer({ study, index }: { study: CaseStudy; index: number }) {
  const { active, select, onKeyDown, buttons } = useTabs(3, 1);
  const sections = [
    {
      label: 'The challenge',
      title: 'Where it started',
      items: study.generalChallenges.slice(0, 2),
    },
    { label: 'The build', title: 'What we delivered', items: study.deliverables.slice(0, 3) },
    {
      label: 'Integration',
      title: 'How it connects',
      items: [study.deliverables[study.id === 'hub-international' ? 4 : 6]!],
    },
  ];
  return (
    <div className="project-scope scope-explorer" data-scope-explorer={study.id}>
      <p className="scope-caption">Inside the delivery</p>
      <div className="scope-choices" role="tablist" aria-label={study.name + ' project details'}>
        {sections.map((s, i) => (
          <button
            type="button"
            key={s.label}
            ref={node => {
              buttons.current[i] = node;
            }}
            id={`scope-${index}-${i}`}
            role="tab"
            aria-controls={`scope-${index}-${i}-panel`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={e => onKeyDown(e, i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      {sections.map((s, i) => (
        <div
          className="scope-panel"
          id={`scope-${index}-${i}-panel`}
          role="tabpanel"
          aria-labelledby={`scope-${index}-${i}`}
          tabIndex={0}
          hidden={i !== active}
          key={s.label}
        >
          <h4>{s.title}</h4>
          <ul className="scope-deliverables">
            {s.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <a className="scope-case-link" href={'/work/' + study.id}>
        Read the full case study
      </a>
    </div>
  );
}
