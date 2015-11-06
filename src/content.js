import initPage from './page';
import { isJWT } from './utils';

const initialJWT = document.body.textContent.trim();

if (isJWT(initialJWT)) {
  initPage(initialJWT);
} else {
  console.error('Invalid token');
}
