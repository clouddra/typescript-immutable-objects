import { Record, Set, Map, fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware } from 'redux';
import { watchLoadTile } from '../sagas/loadTile';
import createSagaMiddleware from 'redux-saga';

// import { makeTypedFactory, TypedRecord } from 'typed-immutable-record';
//
// interface INode {
//   x: number,
//   y: number,
//   z: number,
//   geometryIds: Set
// }
//
// interface INodeRecord extends TypedRecord<INodeRecord>, INode {}
//
// const NodeRecordFactory = makeTypedFactory<INode, INodeRecord>({x: 1, y: 2, z: 0, geometryIds: Set()});
// const NodeRecord = NodeRecordFactory();
//
// class Node extends NodeRecord {
//   addGeometry(id: number) {
//     return this.geometryIds.add(id);
//   }
// }
//
// const nodes = new Node({x: 1, y: 2, z: 0, geometryIds: Set()});

//
// import Immutable = require("immutable");
//
// const defaultValue = { a: 1, b: 2 }
//
// class ABRecord extends Immutable.Record(defaultValue) {
//   getAB() {
//     return this.a + this.b;
//   }
// }
//
// var myRecord = new ABRecord({b:3});
// myRecord.getAB();// 4

interface INode {
  x?: number;
  y?: number;
  geometryIds?: Set<number>;
}

export class Node extends Record({x: 0, y: 0, geometryIds: Set.of(1,2)}) implements INode {
  x: number;
  y: number;
  geometryIds: Set<number>;

  constructor(params?: INode) {
    params ? super(params) : super();
  }

  mutate(values: INode) {
    return this.merge(values) as this;
  }
}

const initialState = fromJS({ nodes: Set<Node>() });

const ADD_NODE = 'addNode';

export function addNode(node: INode) {
  return {
    type: ADD_NODE,
    node
  }
}


function NodeManager(state = Set<Node>(), action) {
  switch (action.type) {
    case ADD_NODE:
      return state.add(new Node(action.node));
    // case DELETE_NODE:
    default:
      return state;
  }
}


const rootReducer = combineReducers({ nodes: NodeManager});
// combineReducers({A: Amanager: B: bmananger})
console.log(createStore(rootReducer, initialState));

export function configureStore(initial = initialState) {
  // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(rootReducer, initial, applyMiddleware(/* other middleware, */sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}

export const store = configureStore();
store.runSaga(watchLoadTile);
