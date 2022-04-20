/*
 * DEPENDANCIES (IF USING TYPEAHEAD SELECTS):
 * - jQuery (https://code.jquery.com/jquery-2.2.4.min.js)
 * - Selectize (https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.12.3/js/standalone/selectize.min.js)
 ----------------------------------------------------------------------- */


/**
 * HELPERS
 ----------------------------------------------------------------------- */
function _hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function _addClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!_hasClass(el, className)) el.className += ' ' + className;
}

function _removeClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}


/*
 * FLOATING LABELS
 ----------------------------------------------------------------------- */
function ie9InputFix() {

  var ua = navigator.userAgent.toLowerCase();
  var isIE9 =
    document.addEventListener &&
    /msie/.test(ua) &&
    parseFloat((ua.match(/.*(?:rv|ie)[\/: ](.+?)([ \);]|$)/) || [])[1]) < 10;

  if ( ! isIE9) return;

  var inputs = document.querySelectorAll('input, textarea');

  function ie9TriggerInput(el) {
    if (el.value !== el.getAttribute('data-oldValue')) {
      var event = document.createEvent('HTMLEvents');
      event.initEvent('input', true, false);
      el.dispatchEvent(event);
    }
  }

  for (var i = inputs.length - 1; i >= 0; i--) {
    var el = inputs[i];
    var selectionListener = (function(theEl) {
      return function(e) { ie9TriggerInput(theEl); }
    })(el);
    el.addEventListener('focus', function() {
      document.addEventListener('selectionchange', selectionListener, false);
    });
    el.addEventListener('blur', function() {
      document.removeEventListener('selectionchange', selectionListener, false);
    });
    el.addEventListener('input', (function(theEl) { 
      return function() {
        el.setAttribute('data-oldValue', el.value);
      }
    })(el));
  }
}

function floatingLabels() {

  var labels = document.getElementsByClassName('fp-floating-label');

  function toggleClass(el, className, value) {
    if (value) {
      _addClass(el, className);
    } else {
      _removeClass(el, className);
    }
  }

  function onFocus(label) {
    toggleClass(label, 'fp-floating-label--focused', true);
  }

  function onBlur(label) {
    toggleClass(label, 'fp-floating-label--focused', false);
  }

  function onInput(label, value) {
    value = value.trim();
    toggleClass(label, 'fp-floating-label--valued', value);
  }

  for (var i = labels.length - 1; i >= 0; i--) {
    var label = labels[i];
    var input = label.nextElementSibling;

    input.addEventListener('focus', (function(theLabel) {
      return function() { onFocus(theLabel); };
    })(label));

    input.addEventListener('blur', (function(theLabel) {
      return function() { onBlur(theLabel); };
    })(label));

    input.addEventListener('input', (function(theLabel) {
      return function() { onInput(theLabel, this.value); };
    })(label));

    onInput(label, input.value);
  }
}

ie9InputFix()
floatingLabels();