import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';

import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
});

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
