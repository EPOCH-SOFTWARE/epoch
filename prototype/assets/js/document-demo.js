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

  function review() {
    error.hidden = true;
    results.replaceChildren();
    try {
      var fields = window.KeptTime.reviewBrief(input.value);
      var found = 0;
      Object.keys(labels).forEach(function (key) {
        results.append(renderField(key, fields[key]));
        if (fields[key].status === 'found') found++;
      });
      state.textContent = 'Reviewed';
      summary.textContent = found === 3 ? 'All three fields have matching evidence.' :
        found + ' of 3 fields found. Review needed for ' + (3 - found) + (found === 2 ? ' field.' : ' fields.');
    } catch (problem) {
      state.textContent = 'Review unavailable';
      summary.textContent = '';
      error.textContent = problem.message || 'The document could not be reviewed. Please try again.';
      error.hidden = false;
    }
  }

  function loadSample(key) {
    activeSample = key;
    input.value = samples[key];
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.sample === key)); });
    review();
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () { loadSample(button.dataset.sample); });
  });
  input.addEventListener('input', function () {
    results.replaceChildren();
    state.textContent = 'Document changed';
    summary.textContent = 'Review the document again to update the results.';
    error.hidden = true;
    buttons.forEach(function (button) { button.setAttribute('aria-pressed', 'false'); });
  });
  form.addEventListener('submit', function (event) { event.preventDefault(); review(); });
  document.querySelector('.demo-reset').addEventListener('click', function () { loadSample(activeSample); });
  loadSample(activeSample);
})();
