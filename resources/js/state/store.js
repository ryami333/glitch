import { createStore } from 'redux';
import reducers from 'state/reducers';

let store = createStore(
    reducers,
);

export default store;
