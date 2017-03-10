import { createAction } from 'redux-actions';

const LOAD_TILE = 'LOAD_TILE';
const loadTile = createAction('LOAD_TILE');
export { loadTile, LOAD_TILE };
