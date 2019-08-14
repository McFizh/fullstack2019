import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBlogs() {
  const blogs = yield axios.get('');

  yield put({
    type: 'BLOGS_RECEIVED',
    data: blogs
  });
}

function* actionWatcher() {
  yield takeLatest('GET_BLOGS', fetchBlogs);
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
};
