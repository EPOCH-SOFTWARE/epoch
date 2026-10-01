// EPOCH prototype: the Insights index and article pages. Articles live here until the site has a CMS.
// Runs after site.js, so the header, footer and closing section already exist.
(function () {
  'use strict';

  var SERVICES = window.EPOCH_DATA.services;
  var WORDS_PER_MINUTE = 220;

  // Body blocks: { p }, { h2 }, { ul: [] } or { quote }. `closing` invites a conversation.
  var ARTICLES = [
    {
      slug: 'why-ai-pilots-stall',
      title: 'Why AI pilots stall before production',
      dek: 'When a pilot stalls, the model is rarely the problem. The trouble is everything the demo didn’t have to handle.',
      date: '2026-09-09',
      related: ['ai-ml', 'data-analytics', 'devops'],
      body: [
        { p: 'A pilot is built to answer one question: can this work? Usually, it can. A capable team, a clean sample of data and a few focused weeks will produce a demo that impresses the room. Then the project goes quiet. The demo still works, but it never becomes something the business relies on.' },
        { p: 'The cause is rarely the model. It’s the parts of a real system that a pilot is allowed to skip. Here are five of them, and what to do about each before you start.' },
        { h2: 'Nobody owns it after the demo' },
        { p: 'Pilots often begin as side projects: an innovation team, a curious executive, a vendor keen to show what’s possible. That’s a fine way to explore and a poor way to ship. A production system needs an owner who answers for the outcome, has a budget beyond the pilot and can make decisions when the work runs into real constraints.' },
        { p: 'Before the pilot starts, name the person who will own the system if it works, and agree on what “works” means to them. If nobody will own it, you’ve learned something important for the price of a conversation.' },
        { h2: 'It ran on data production won’t have' },
        { p: 'Pilot data is usually a hand-picked export: cleaned, de-duplicated and frozen in time. Production data arrives late, incomplete and in formats that change without warning. A model that looked accurate on the export can behave very differently on the live feed.' },
        { p: 'Run the pilot on data pulled the way production will pull it, even if that’s slower. Write down every manual cleanup step you take, because each one is a pipeline you’ll have to build later.' },
        { h2: 'There’s no baseline to beat' },
        { p: '“The model looks good” isn’t a decision anyone can defend. Good compared to what? The current process? A simple rule? The judgment of your most experienced people? Without a baseline, every review turns into a debate about impressions.' },
        { p: 'Measure the current process before you build anything: how long it takes, how often it’s wrong, what it costs and what its worst mistakes look like. Then agree on the bar the pilot has to clear to earn a place in production, and write it down.' },
        { h2: 'Integration and security were left for later' },
        { p: 'A pilot can live in a notebook or a standalone app. A production system has to live inside your business: reading from the systems of record, writing results back, respecting permissions, logging what it did and passing a security review. That work is often bigger than the model itself, and it’s where timelines quietly double.' },
        { p: 'Sketch the production path during the pilot. Which systems will it read and write? Who is allowed to see its outputs? What will security need to approve? You don’t have to build it all up front, but you can’t afford to discover it at the end.' },
        { h2: 'Nobody is watching it after launch' },
        { p: 'Models rarely fail loudly. Inputs drift, upstream systems change and quality erodes without a single error message. If nobody is measuring, the first sign of trouble is a frustrated user, or a bad decision someone has to explain.' },
        { p: 'Plan monitoring as part of the build. Track the quality of what goes in and what comes out, set thresholds, and decide in advance who gets alerted and what they do next. Budget for retraining and prompt updates as a normal cost of running the system, not a surprise.' },
        { quote: 'A pilot answers “can this work?” Production answers “can we rely on it?” Plan for the second question from the first day.' },
        { h2: 'What to do instead' },
        {
          ul: [
            'Name an owner and a success bar before anyone writes code.',
            'Use production-shaped data, and log every manual fix.',
            'Measure the current process so the pilot has something to beat.',
            'Map integrations, permissions and security review early.',
            'Treat monitoring and maintenance as part of the scope.',
          ],
        },
        { p: 'None of this slows a pilot down in any way that matters. It makes the decision at the end of it real: either you have a system the business can rely on, or you know exactly what it would take to get there.' },
      ],
      closing: 'If you have a pilot that’s stuck, or one you’d like to start properly, we’d be glad to look at it with you.',
    },
    {
      slug: 'evaluating-llm-systems',
      title: 'How to evaluate an LLM system before you trust it',
      dek: 'A handful of good answers in a demo isn’t evidence. Here’s how to build the evidence before real people depend on the system.',
      date: '2026-09-23',
      related: ['generative-ai', 'ai-ml', 'cybersecurity'],
      body: [
        { p: 'Large language models are persuasive by design. They answer fluently, sound confident and handle the examples you try in a demo. That’s exactly why evaluating them takes discipline: their failures are rarer, quieter and easy to miss until someone acts on one.' },
        { p: 'Evaluation isn’t a test you pass once. It’s a set of habits that runs from the first prototype through every change after launch.' },
        { h2: 'Define the job, and how it can fail' },
        { p: 'Start by writing down what the system is for, in plain language: who asks it things, what they ask and what a good answer lets them do next. Then list the ways it can go wrong. Some failures are merely annoying, like a clumsy summary. Others are expensive: a confident answer that cites a policy that doesn’t exist, data shown to someone who shouldn’t see it, or an action nobody approved.' },
        { p: 'Be specific about scope as well. A support assistant that answers billing questions shouldn’t attempt legal advice, and deciding what the system should decline is part of defining the job.' },
        { p: 'Rank those failures by what they would cost you. The ranking decides where to spend evaluation effort, and which mistakes you can tolerate at what rate.' },
        { h2: 'Build an evaluation set from real cases' },
        { p: 'Public benchmarks describe a model in general, not your task. The most useful evaluation set is made of real inputs from your domain: questions from actual support tickets, the documents your teams really use, the edge cases your experts remember.' },
        {
          ul: [
            'Cover the common cases, the hard cases and the cases that must never go wrong.',
            'For each case, write down the expected answer, or what a good answer must include and must avoid.',
            'Keep part of the set aside and never tune against it, so you can tell real improvement from memorizing the test.',
          ],
        },
        { p: 'Start small. A few dozen well-chosen cases beat thousands that nobody has read. Add a new case every time you find a new failure.' },
        { h2: 'Combine automated checks with human review' },
        { p: 'Some qualities can be checked automatically: whether the output follows the required format, whether cited sources exist and actually support the claim, whether sensitive fields appear where they shouldn’t. Using a second model to grade answers can help at scale, but treat its scores as a reason to look closer, not a verdict, and check them against human judgment regularly.' },
        { p: 'For the failures that matter most, keep people in the loop. Domain experts reviewing a sample of real outputs every week will catch problems no metric was designed to see.' },
        { h2: 'Test every change like a release' },
        { p: 'Prompts, retrieval settings, model versions and source documents all change behavior, sometimes in places you didn’t touch. Run the full evaluation set on every change and compare the results with the last version you trusted. A fix for one case can quietly break others, and only regression tests catch that before your users do.' },
        { p: 'Keep the history of results, too. When quality shifts, you want to see exactly which change caused it and roll back in minutes, rather than debate it for days.' },
        { h2: 'Keep evaluating in production' },
        { p: 'Real users will ask things your evaluation set never imagined. Log inputs and outputs with the privacy controls your data requires, review a sample on a regular schedule, and watch signals like user corrections, escalations and abandoned sessions. The interesting failures go back into the evaluation set.' },
        { p: 'Set a review rhythm and stick to it. A weekly look at a small sample, owned by a named person, beats an annual audit that nobody remembers to run.' },
        { h2: 'Put guardrails where mistakes are expensive' },
        {
          ul: [
            'Give the system the least access it needs: read-only unless an action is truly required.',
            'Require confirmation before anything that can’t be undone.',
            'Ground answers in approved sources, and let the system say “I don’t know.”',
            'Route low-confidence or high-risk cases to a person.',
          ],
        },
        { p: 'Guardrails aren’t a sign of distrust in the model. They’re how you decide, deliberately, which mistakes the system is allowed to make on its own and which ones need a person.' },
        { quote: 'Trust in an AI system should be earned the way trust in any system is: with evidence, collected continuously.' },
        { p: 'Done well, evaluation doesn’t slow a team down. It’s what lets you change prompts, switch models and ship improvements with confidence instead of crossed fingers.' },
      ],
      closing: 'If you’re about to put an LLM system in front of customers or employees and want a second opinion on how it’s evaluated, let’s talk.',
    },
    {
      slug: 'first-30-days',
      title: 'The first 30 days of an AI project',
      dek: 'The first month decides whether an AI project becomes a working system or a slide. Here’s how we spend it.',
      date: '2026-10-01',
      related: ['ai-ml', 'digital-transformation'],
      body: [
        { p: 'Most of the risk in an AI project is visible early, if you go looking for it. Can we get the data? Is it good enough? Does the approach work on real cases? Will anyone actually use the result? The first 30 days are for answering those questions with evidence instead of opinions, so the decision at the end is easy to make.' },
        { p: 'A month is long enough to test an idea on real data and short enough that stopping is cheap. It forces the hard questions to the front, where they belong.' },
        { p: 'Here’s what that month looks like when we run it.' },
        { h2: 'Week 1: Discovery' },
        { p: 'We start with people, not models. We meet the stakeholders who own the outcome, the experts who do the work today and the team that runs the systems involved.' },
        {
          ul: [
            'Goals: what changes for the business if this works, and how we’ll measure it.',
            'Constraints: budget, deadlines, compliance requirements and the systems we can’t touch.',
            'Stakeholders: who decides, who will use it and who will support it after launch.',
            'Data access: what exists, where it lives and which approvals we need to reach it.',
          ],
        },
        { p: 'We also ask what has been tried before. Earlier attempts, even failed ones, are often the fastest way to learn where the real problems are.' },
        { p: 'Access approvals can take time, so we start them on day one.' },
        { h2: 'Week 2: Assessment and a written plan' },
        { p: 'With access in hand, we look at the real data: its quality, its gaps and how it changes over time. We measure how the current process performs, so there’s a baseline to beat, and we test the riskiest assumptions first. If the data can’t support the idea, this is where we say so: it’s far cheaper to change course in week 2 than in month six.' },
        { p: 'The week ends with a written plan: the approach, the architecture, what the prototype will and won’t do, how we’ll judge it, and the risks we can already see. It’s short enough to read in one sitting and specific enough to disagree with.' },
        { h2: 'Weeks 3–4: A working prototype on your data' },
        { p: 'Then we build. Not a slide deck or a mock-up, but a working prototype running on your real data and shaped like the production system it could become. It handles the core job end to end, even if some edges are still rough.' },
        {
          ul: [
            'We demo progress every week, to the people who will actually use it.',
            'We evaluate it against the baseline and the bar we agreed on in week 2.',
            'We keep a running list of what production would need: integrations, security, monitoring and support.',
          ],
        },
        { p: 'By the end of week four, the people who will use the system have already tried it, and their feedback has shaped what gets built next.' },
        { h2: 'Day 30: A decision' },
        { p: 'At the end of the month you have three things: a prototype you’ve seen working on your own data, results measured against a bar you agreed to, and a clear view of what production would take in time and cost. The decision is then straightforward:' },
        {
          ul: [
            'Go to production: the prototype cleared the bar and the path is clear.',
            'Adjust: the idea holds, but something has to change first, such as the scope, the data or the approach.',
            'Stop: the evidence says it isn’t worth it, and you found out in a month instead of a year.',
          ],
        },
        { p: 'Whichever way it goes, you decide with evidence in hand rather than a hunch.' },
        { quote: 'Stopping at day 30 isn’t a failure. Finding out a year later would have been.' },
        { h2: 'What we need from you' },
        { p: 'A month moves quickly when a few things are in place: a decision-maker who can make calls fast, someone who can unblock access to data and systems, and a few hours each week from the people who know the work best. Their judgment is the difference between a prototype that impresses and one that’s genuinely useful.' },
        { p: 'If any of these are hard to arrange, tell us early. We would rather plan around a constraint than discover it in week three.' },
      ],
      closing: 'If you have an AI idea you’d like to test properly, a 30-minute call is a good place to start.',
    },
  ];

  // ---------- Helpers ----------

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function list(items, render) {
    return items.map(render).join('');
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function blockText(block) {
    return block.p || block.h2 || block.quote || (block.ul ? block.ul.join(' ') : '');
  }

  function readingTime(article) {
    var text = [article.dek, article.closing].concat(article.body.map(blockText)).join(' ');
    var words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  }

  function formatDate(iso) {
    return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  }

  function newestFirst() {
    return ARTICLES.slice().sort(function (a, b) {
      return b.date.localeCompare(a.date);
    });
  }

  function findArticle(slug) {
    return ARTICLES.filter(function (article) {
      return article.slug === slug;
    })[0];
  }

  function findService(id) {
    return SERVICES.filter(function (service) {
      return service.id === id;
    })[0];
  }

  function dateline(article) {
    return (
      '<time datetime="' + article.date + '">' + esc(formatDate(article.date)) + '</time>' +
      '<span>' + readingTime(article) + ' min read</span>'
    );
  }

  // ---------- Index ----------

  function card(article) {
    return (
      '<article class="card">' +
      '<p class="meta ins-meta">' + dateline(article) + '</p>' +
      '<h3><a href="article.html?id=' + article.slug + '">' + esc(article.title) + '</a></h3>' +
      '<p class="ins-dek">' + esc(article.dek) + '</p>' +
      '<p class="more" aria-hidden="true">Read the article</p>' +
      '</article>'
    );
  }

  function renderIndex() {
    var target = document.querySelector('[data-insights]');
    if (!target) return;
    target.innerHTML = list(newestFirst(), card);
  }

  // ---------- Article ----------

  function block(item) {
    if (item.h2) return '<h2 id="' + slugify(item.h2) + '">' + esc(item.h2) + '</h2>';
    if (item.ul) {
      return '<ul>' + list(item.ul, function (entry) {
        return '<li>' + esc(entry) + '</li>';
      }) + '</ul>';
    }
    if (item.quote) return '<blockquote class="ins-quote"><p>' + esc(item.quote) + '</p></blockquote>';
    return '<p>' + esc(item.p) + '</p>';
  }

  function contents(article) {
    var headings = article.body.filter(function (item) {
      return item.h2;
    });
    return (
      '<nav class="ins-toc" aria-label="In this article"><p class="ins-toc-title">In this article</p><ol>' +
      list(headings, function (item) {
        return '<li><a href="#' + slugify(item.h2) + '">' + esc(item.h2) + '</a></li>';
      }) +
      '</ol></nav>'
    );
  }

  function closing(article) {
    var related = article.related.map(findService).filter(Boolean);
    return (
      '<div class="ins-closing">' +
      '<p>' + esc(article.closing) + '</p>' +
      '<div class="actions"><a class="btn" href="contact.html">Start a project</a>' +
      '<a class="btn secondary" href="contact.html#book">Book a 30-minute call</a></div>' +
      '<h2 class="ins-related-title">Related services</h2>' +
      '<ul class="chips">' + list(related, function (service) {
        return '<li><a class="chip" href="service.html?id=' + service.id + '">' + esc(service.title) + '</a></li>';
      }) + '</ul>' +
      '</div>'
    );
  }

  function articleMarkup(article) {
    var others = newestFirst().filter(function (item) {
      return item.slug !== article.slug;
    });
    return (
      '<article class="ins-article" aria-labelledby="article-title">' +
      '<header class="page-hero"><div class="wrap">' +
      '<p class="crumbs"><a href="insights.html">Insights</a><span aria-hidden="true">/</span><span>' + esc(article.title) + '</span></p>' +
      '<h1 id="article-title" class="display ins-title">' + esc(article.title) + '</h1>' +
      '<p class="lede">' + esc(article.dek) + '</p>' +
      '<p class="ins-byline"><span>EPOCH</span>' + dateline(article) + '</p>' +
      '</div></header>' +
      '<div class="section ruled"><div class="wrap ins-layout">' +
      '<aside class="ins-aside">' + contents(article) + '</aside>' +
      '<div class="ins-body">' + list(article.body, block) + closing(article) + '</div>' +
      '</div></div>' +
      '</article>' +
      '<section class="section ruled" aria-labelledby="more-title"><div class="wrap">' +
      '<div class="head split"><h2 id="more-title" class="h2">Keep reading</h2></div>' +
      '<div class="cards ins-cards-2">' + list(others, card) + '</div>' +
      '</div></section>'
    );
  }

  function renderArticle() {
    var target = document.querySelector('[data-article]');
    if (!target) return;
    var article = findArticle(new URLSearchParams(window.location.search).get('id'));
    if (!article) {
      document.title = 'Article not found — EPOCH';
      target.innerHTML =
        '<section class="page-hero"><div class="wrap"><p class="mono">404</p>' +
        '<h1 class="display">We haven’t published that article.</h1>' +
        '<div class="actions"><a class="btn" href="insights.html">See all insights</a></div></div></section>';
      return;
    }
    document.title = article.title + ' — EPOCH';
    target.innerHTML = articleMarkup(article);
  }

  renderIndex();
  renderArticle();
})();
