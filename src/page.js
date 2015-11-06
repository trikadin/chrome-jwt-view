import { stringifyChunk, base64, signJWT } from './utils';
import template from './editor.hbs';

function parseChunk(str: string) :Object {
  return JSON.parse(base64.from(str));
}

function renderChunk(node: Element, str: string) :string {
  let newValue = '';
  try {
    newValue = JSON.stringify(parseChunk(str), null, 4);
    node.parentNode.classList.remove('error');
  } catch (ignore) {
    node.parentNode.classList.add('error');
  }

  node.textContent = newValue;
}

function onPasteCleaner(event: Event) {
  event.preventDefault();

  const data = event.clipboardData.getData('text/plain');
  if (data) {
    document.execCommand('insertText', null, data);
  }
}

export default function init(initialToken: string = '') {
  require('./editor.css');

  document.body.innerHTML = template({token: initialToken});

  const
    textarea = document.getElementById('jwt'),
    header = document.getElementById('header'),
    payload = document.getElementById('payload'),
    secret = document.getElementById('secret'),
    footer = document.querySelector('footer');

  function renderParsedJWT() {
    const token = textarea.value.split('.');
    renderChunk(header, token[0]);
    renderChunk(payload, token[1]);
  }

  async function rebuildToken() {
    let
      token = '',
      headerObj,
      payloadObj;

    try {
      headerObj = JSON.parse(header.textContent);
      payloadObj = JSON.parse(payload.textContent);

      token += stringifyChunk(headerObj) + '.' + stringifyChunk(payloadObj) + '.';
    } catch (ignore) {
      footer.textContent = 'Chunk value is not valid JSON';
      return;
    }

    try {
      token += base64.to(await signJWT(headerObj, payloadObj, secret.value || ''));
    } catch (err) {
      console.error(err);
      footer.textContent = err.message;
      throw err;
    }

    textarea.value = token;
  }

  textarea.addEventListener('input', renderParsedJWT, false);
  header.addEventListener('input', rebuildToken, false);
  payload.addEventListener('input', rebuildToken, false);

  header.addEventListener('paste', onPasteCleaner, false);
  payload.addEventListener('paste', onPasteCleaner, false);

  renderParsedJWT();
}
