import { put, takeEvery } from 'redux-saga/effects';
import { LOAD_TILE } from '../actions';
import * as THREE from 'three';
// import { createAction } from 'redux-actions';

const raycaster = new THREE.Raycaster();
// import { Node, store } from '../store/store';

// Our worker Saga: will perform the async increment task
// interface ICameraPayload {
//   payload: THREE.Camera;
// }

export function* loadTileAsync({ payload }) {
  // payload
  payload.
  console.log('loadTileAsyncloadTileAsync', payload);
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchLoadTile() {
  // yield take(loadTile);
  yield takeEvery(LOAD_TILE, loadTileAsync);
}
