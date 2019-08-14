import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import blogReducer from './reducers/blogReducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  blogs: blogReducer
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
