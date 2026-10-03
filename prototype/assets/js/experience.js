// Guided discovery and project reading. All client material comes from the existing catalogue.
(function () {
  'use strict';
  var data = window.EPOCH_DATA;
  var goals = [
    {
      id: 'automate',
      title: 'Automate a workflow',
      service: 'generative-ai',
      headline: 'Give your team back the workday.',
      description:
        'Connect the documents, decisions and systems behind a repetitive process. Keep people involved where judgement matters.',
      stages: [
        'Understand the workflow',
        'Connect AI to your systems',
        'Review, measure and improve',
      ],
      illustrationAlt:
        'Paper documents connect through a review step to one structured record, with a person included in the workflow.',
      illustrationCaption: 'Documents, decisions and a person in the loop.',
      capabilities: ['generative-ai', 'ai-ml', 'data-analytics'],
      question: 'Which task takes more time than it should?',
    },
    {
      id: 'build',
      title: 'Build an AI product',
      service: 'ai-ml',
      headline: 'Make the idea work in the real world.',
      description:
        'Bring the model, the interface and the engineering together. Build around the people who will use it, from the first interaction to production.',
      stages: ['Define the product', 'Build and evaluate', 'Launch and support'],
      illustrationAlt:
        'A question connects to source documents and an answer, with a highlighted line tying the answer back to its evidence.',
      illustrationCaption: 'An answer is only as useful as the evidence behind it.',
      capabilities: ['ai-ml', 'generative-ai', 'custom-software'],
      question: 'What should someone be able to do with your product?',
    },
    {
      id: 'modernise',
      title: 'Modernise a platform',
      service: 'custom-software',
      headline: 'Move forward. Bring your systems with you.',
      description:
        'Connect existing infrastructure to modern software, data and AI capabilities. Work through the dependencies and the path to production.',
      stages: ['Map the existing systems', 'Build the next capability', 'Integrate and operate'],
      illustrationAlt:
        'An existing platform connects to four separate components, with one path highlighted as the capability being modernised.',
      illustrationCaption: 'A new capability, connected to what already works.',
      capabilities: ['custom-software', 'cloud-computing', 'devops'],
      question: 'Where is your current platform holding you back?',
    },
  ];

  function node(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function link(text, href, className) {
    var element = node('a', className, text);
    element.href = href;
    return element;
  }

  // Tabs use a single keyboard stop, arrow keys and Home/End. Click and focus show the same panel.
  function bindTabs(buttons, panels, select) {
    buttons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        select(index);
      });
      button.addEventListener('keydown', function (event) {
        var next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
          next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
          next = (index + buttons.length - 1) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        select(next);
        buttons[next].focus();
      });
    });
    return function (index) {
      buttons.forEach(function (button, position) {
        button.setAttribute('aria-selected', String(position === index));
        button.tabIndex = position === index ? 0 : -1;
        panels[position].hidden = position !== index;
      });
    };
  }

  function initGoals() {
    var root = document.querySelector('[data-goal-explorer]');
    if (!root) return;
    root.id = 'explore';
    root.className = 'goal-layout';
    var choices = node('div', 'goal-choices');
    choices.setAttribute('role', 'tablist');
    choices.setAttribute('aria-label', 'Your project goal');
    choices.setAttribute('aria-orientation', 'vertical');
    var content = node('div', 'goal-content');
    var buttons = [];
    var panels = [];
    goals.forEach(function (goal) {
      var button = node('button', 'goal-choice', goal.title);
      button.type = 'button';
      button.id = 'goal-' + goal.id;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', 'goal-panel-' + goal.id);
      choices.append(button);
      buttons.push(button);
      var panel = node('div', 'goal-panel');
      panel.id = 'goal-panel-' + goal.id;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', button.id);
      panel.tabIndex = 0;
      panel.append(node('h3', '', goal.headline), node('p', 'goal-description', goal.description));
      var figure = node('figure', 'goal-illustration');
      var illustration = node('img', 'editorial-image');
      illustration.src = 'assets/illustrations/goal-' + goal.id + '.svg';
      illustration.alt = goal.illustrationAlt;
      illustration.width = 960;
      illustration.height = 520;
      figure.append(illustration, node('figcaption', '', goal.illustrationCaption));
      panel.append(figure);
      var stages = node('ol', 'goal-stages');
      goal.stages.forEach(function (stage) {
        stages.append(node('li', '', stage));
      });
      panel.append(stages);
      var capabilities = node('div', 'goal-capabilities');
      capabilities.append(node('p', '', 'What comes together'));
      var links = node('ul', 'goal-links');
      goal.capabilities.forEach(function (id) {
        var service = data.services.find(function (item) {
          return item.id === id;
        });
        var item = node('li');
        item.append(link(service.title, 'service.html?id=' + id));
        links.append(item);
      });
      capabilities.append(links);
      panel.append(capabilities);
      var foot = node('div', 'goal-foot');
      foot.append(
        node('p', '', goal.question),
        link('Talk through this project', 'contact.html?goal=' + goal.id + '#message', 'btn')
      );
      foot.append(
        link(
          goal.id === 'modernise' ? 'Explore the Inspira project' : 'Explore the HUB project',
          'case.html?id=' + (goal.id === 'modernise' ? 'inspira-financial' : 'hub-international'),
          'goal-proof'
        )
      );
      panel.append(foot);
      content.append(panel);
      panels.push(panel);
    });
    root.append(choices, content);
    var update = bindTabs(buttons, panels, function (index) {
      update(index);
      var url = new URL(location.href);
      url.searchParams.set('goal', goals[index].id);
      history.replaceState(null, '', url);
    });
    var requested = new URLSearchParams(location.search).get('goal');
    var initial = goals.findIndex(function (goal) {
      return goal.id === requested;
    });
    update(initial < 0 ? 0 : initial);
  }

  function initScope() {
    document.querySelectorAll('[data-scope-explorer]').forEach(function (root, rootIndex) {
      var study = data.caseStudies.find(function (item) {
        return item.id === root.dataset.scopeExplorer;
      });
      if (!study) return;
      root.replaceChildren();
      root.classList.add('scope-explorer');
      root.append(node('p', 'scope-caption', 'Inside the delivery'));
      var choices = node('div', 'scope-choices');
      choices.setAttribute('role', 'tablist');
      choices.setAttribute('aria-label', study.name + ' project details');
      var sections = [
        {
          label: 'The challenge',
          title: 'Where it started',
          items: study.generalChallenges.slice(0, 2),
        },
        { label: 'The build', title: 'What we delivered', items: study.deliverables.slice(0, 3) },
        {
          label: 'Integration',
          title: 'How it connects',
          items: [study.deliverables[study.id === 'hub-international' ? 4 : 6]],
        },
      ];
      var panels = [];
      var buttons = [];
      sections.forEach(function (section, index) {
        var id = 'scope-' + rootIndex + '-' + index;
        var button = node('button', '', section.label);
        button.type = 'button';
        button.id = id;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', id + '-panel');
        buttons.push(button);
        choices.append(button);
        var panel = node('div', 'scope-panel');
        panel.id = id + '-panel';
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', id);
        panel.tabIndex = 0;
        panel.append(node('h4', '', section.title));
        var list = node('ul', 'scope-deliverables');
        section.items.forEach(function (item) {
          list.append(node('li', '', item));
        });
        panel.append(list);
        panels.push(panel);
      });
      root.append(choices);
      panels.forEach(function (panel) {
        root.append(panel);
      });
      root.append(link('Read the full case study', 'case.html?id=' + study.id, 'scope-case-link'));
      var update = bindTabs(buttons, panels, function (index) {
        update(index);
      });
      update(1);
    });
  }

  function initContactContext() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var select = form.elements.namedItem('projectType');
    data.services.forEach(function (service) {
      var option = node('option', '', service.title);
      option.value = service.id;
      select.append(option);
    });
    var context = window.KeptTime.contactContext(location.search, data.services, goals);
    var banner = document.querySelector('[data-enquiry-context]');
    function clearContext() {
      banner.hidden = true;
      var url = new URL(location.href);
      url.searchParams.delete('goal');
      url.searchParams.delete('service');
      history.replaceState(null, '', url);
    }
    if (context) {
      select.value = context.service;
      banner.querySelector('p').textContent = 'Let’s talk about: ' + context.label;
      banner.hidden = false;
    }
    select.addEventListener('change', clearContext);
    document.querySelector('[data-clear-context]').addEventListener('click', function () {
      select.value = '';
      clearContext();
      form.elements.namedItem('name').focus();
    });
  }

  function initServiceLinks() {
    if (document.body.dataset.page !== 'service') return;
    var id = new URLSearchParams(location.search).get('id') || 'ai-ml';
    if (
      !data.services.some(function (service) {
        return service.id === id;
      })
    )
      return;
    document.querySelectorAll('main a[href^="contact.html"]').forEach(function (anchor) {
      var url = new URL(anchor.href);
      url.searchParams.set('service', id);
      anchor.href = url.pathname.split('/').pop() + url.search + url.hash;
    });
  }

  function initReadingGuide() {
    var page = document.body.dataset.page;
    if (page !== 'case' && page !== 'service') return;
    var sections = Array.from(document.querySelectorAll('main > .section')).filter(
      function (section) {
        return section.querySelector('h2') && !section.classList.contains('closing');
      }
    );
    if (!sections.length) return;
    var names =
      page === 'case'
        ? ['Problem', 'Build', 'Team', 'Challenges', 'Technology', 'Outcomes']
        : [
            'Problem',
            'Approach',
            'Deliverables',
            'Process',
            'Industries',
            'Why EPOCH',
            'Questions',
          ];
    sections = sections.slice(0, names.length);
    var nav = node('nav', 'reading-guide wrap');
    nav.setAttribute('aria-label', 'On this page');
    var anchors = [];
    sections.forEach(function (section, index) {
      section.id = 'read-' + index;
      var anchor = link(names[index], '#read-' + index);
      anchors.push(anchor);
      nav.append(anchor);
    });
    document.querySelector('main > .page-hero').after(nav);
    var queued = false;
    function update() {
      var index = window.KeptTime.stepAt(
        sections.map(function (section) {
          return section.getBoundingClientRect().top;
        }),
        160
      );
      anchors.forEach(function (anchor, position) {
        if (position === index) anchor.setAttribute('aria-current', 'location');
        else anchor.removeAttribute('aria-current');
      });
      queued = false;
    }
    window.addEventListener(
      'scroll',
      function () {
        if (!queued) {
          queued = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', update);
    update();
  }

  initGoals();
  initScope();
  initContactContext();
  initServiceLinks();
  initReadingGuide();
})();
