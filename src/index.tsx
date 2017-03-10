import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Simple } from './App';
import { Node, store, addNode } from './store/store';
import { createListSelector } from 'reselect-map';

const nodeSelector = state => state.get('nodes');

const render = createListSelector(
  nodeSelector,
  (node) => {
    console.log('re-rendering', node.toJS());

    // do render
    // if (!renderObjects[node.get('id')]) {
    //   renderObjects[node.get('id')] = create()
    // }

    // mutate3js();
    // do some expensive function
    return node;
  }
);

const someNode = new Node();
// console.log(someNode.x, someNode.geometryIds.toJS());
const newNode = someNode.mutate({x: 5});
// console.log(newNode.x);
// console.log(newNode === someNode);

store.dispatch(addNode({x: 1, y: 2}));

const fN = store.getState().get('nodes').first();
// render(store.getState());
store.dispatch(addNode({x: 4, y: 4}));
// render(store.getState());
store.dispatch(addNode({x: 5, y: 5}));
// console.log('first render');
render(store.getState());

store.dispatch(addNode({x: 6, y: 6}));
console.log('2nd render');
render(store.getState());


// console.log('first eq?', fN === store.getState().get('nodes').first());
// x();
// console.log(Simple);

ReactDOM.render(
  <Simple/>,
  document.getElementById('root') as HTMLElement
);
