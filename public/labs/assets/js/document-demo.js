(function () {
  'use strict';

  var samples = {
    complete: 'Project handover\n\nProject: Document intake review\nOwner: Ada Lovelace\nTarget date: 30 October\n\nNotes from discovery:\nStart with the incoming project briefs.\nEvery extracted field needs a source.\nSend unclear details to a person.',
    missing: 'Project handover\n\nProject: Document intake review\nOwner: TBD\nTarget date: 30 October\n\nNotes from discovery:\nThe team has not confirmed an owner.\nKeep this open until someone is assigned.',
    conflict: 'Project handover\n\nProject: Document intake review\nOwner: Ada Lovelace\nTarget date: 30 October\n\nFollow-up note:\nTarget date: 6 November\n\nThe notes disagree. Confirm the date\nbefore making a commitment.',
  };
  var labels = { project: 'Project', owner: 'Owner', target: 'Target date' };
  var activeSample = 'complete';
  var form = document.getElementById('review-form');
  var input = document.getElementById('source-document');
  var results = document.querySelector('[data-review-results]');
  var summary = document.querySelector('[data-review-summary]');
  var state = document.querySelector('[data-review-state]');
  var error = document.querySelector('[data-review-error]');
  var submit = form.querySelector('[type=submit]');
  var connection = document.querySelector('[data-ai-connection]');
  var revision = 0;
  var pending = null;
  var buttons = Array.from(document.querySelectorAll('[data-sample]'));

  function element(tag, className, content) {
    var node = document.createElement(tag);
    node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function showSource(source) {
    input.focus();
    input.setSelectionRange(source.start, source.end);
    // The editor has fixed leading; bring the selected line into its visible area.
    input.scrollTop = Math.max(0, (source.line - 3) * parseFloat(getComputedStyle(input).lineHeight));
    input.scrollIntoView({ block: 'center', behavior: 'instant' });
  }

  function renderField(key, field) {
    var row = element('div', 'review-field');
    row.append(element('h3', '', labels[key]));
    var value = field.status === 'found' ? field.value : field.status === 'conflict' ? 'Needs a decision' : 'Not confirmed';
    row.append(element('p', 'review-value', value));
    if (field.status === 'conflict') {
      row.append(element('p', 'review-detail', field.values.join(' / ') + (field.values.length === 1 ? ' / unconfirmed' : '')));
    } else if (field.status === 'missing') {
      row.append(element('p', 'review-detail', 'Add a confirmed ' + labels[key].toLowerCase() + ' to the document.'));
    }
    var sources = element('div', 'review-sources');
    field.sources.forEach(function (source) {
      var button = element('button', 'source-link', 'Source: line ' + source.line);
      button.type = 'button';
      button.setAttribute('aria-label', 'Show ' + labels[key].toLowerCase() + ' source, line ' + source.line);
      button.addEventListener('click', function () { showSource(source); });
      sources.append(button);
    });
    row.append(sources);
    return row;
  }

  function clearReview() {
    revision++;
    if (pending) pending.abort();
    pending = null;
    submit.disabled = false;
    submit.textContent = 'Review with AI';
    results.setAttribute('aria-busy', 'false');
    error.hidden = true;
    results.replaceChildren();
  }

  function renderReview(fields, mode) {
    var found = 0;
    Object.keys(labels).forEach(function (key) {
      results.append(renderField(key, fields[key]));
      if (fields[key].status === 'found') found++;
    });
    state.textContent = mode;
    summary.textContent = found === 3 ? 'Three fields found. Check each source before using an answer.' :
      found + ' of 3 fields found. Review needed for ' + (3 - found) + (found === 2 ? ' field.' : ' fields.');
  }

  function showError(problem) {
    results.replaceChildren();
    state.textContent = 'Review unavailable';
    summary.textContent = '';
    error.textContent = problem.message || 'The document could not be reviewed. Please try again.';
    error.hidden = false;
  }

  function preview() {
    clearReview();
    try {
      renderReview(window.KeptTime.reviewBrief(input.value), 'Sample preview');
    } catch (problem) {
      showError(problem);
    }
  }

  async function reviewWithAI() {
    if (!input.value.trim()) {
      clearReview();
      showError(new Error('Enter a project brief to review.'));
      input.focus();
      return;
    }
    clearReview();
    var currentRevision = revision;
    var controller = new AbortController();
    var timedOut = false;
    pending = controller;
    submit.disabled = true;
    submit.textContent = 'Reviewing…';
    state.textContent = 'AI reviewing';
    results.setAttribute('aria-busy', 'true');
    summary.textContent = 'Reading the document and checking source quotes. This can take a moment.';
    var timeout = setTimeout(function () { timedOut = true; controller.abort(); }, 55000);
    try {
      var response = await fetch('/api/document-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document: input.value }),
        signal: controller.signal,
      });
      var payload = await response.json();
      if (revision !== currentRevision) return;
      if (!response.ok) throw new Error(payload.error || 'AI review is unavailable. Please try again.');
      renderReview(payload.fields, 'AI review');
      connection.textContent = 'AI connected. Documents are sent only when you choose Review with AI.';
    } catch (problem) {
      if (revision !== currentRevision) return;
      if (timedOut) showError(new Error('AI review took too long. Please try again.'));
      else if (problem instanceof TypeError || problem instanceof SyntaxError) {
        showError(new Error('AI review could not connect. Please try again or use the sample preview.'));
      } else showError(problem);
    } finally {
      clearTimeout(timeout);
      if (revision === currentRevision) {
        pending = null;
        submit.disabled = false;
        submit.textContent = 'Review with AI';
        results.setAttribute('aria-busy', 'false');
      }
    }
  }

  async function checkConnection() {
    try {
      var response = await fetch('/api/document-review', { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error('Connection unavailable');
      var status = await response.json();
      connection.textContent = status.available ?
        'AI review is ready to try. Choose Review with AI to send this document.' :
        'AI review is not connected on this server yet. The sample preview still works.';
    } catch (problem) {
      connection.textContent = 'AI connection could not be checked. You can still use the sample preview.';
    }
  }

  function loadSample(key) {
    activeSample = key;
    input.value = samples[key];
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.sample === key)); });
    preview();
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () { loadSample(button.dataset.sample); });
  });
  input.addEventListener('input', function () {
    clearReview();
    state.textContent = 'Document changed';
    summary.textContent = 'Review the document again to update the results.';
    error.hidden = true;
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', 'false'); });
  });
  form.addEventListener('submit', function (event) { event.preventDefault(); reviewWithAI(); });
  document.querySelector('.demo-reset').addEventListener('click', function () { loadSample(activeSample); });
  document.querySelector('[data-preview]').addEventListener('click', preview);
  loadSample(activeSample);
  checkConnection();
})();
