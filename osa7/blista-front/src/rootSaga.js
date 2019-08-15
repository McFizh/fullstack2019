import { put, takeLatest, all, delay } from 'redux-saga/effects';
import BlogService from './services/blogs';

function* setNotification({ notification }) {
  yield delay(notification.delay * 1000);
  yield put({ type: 'HIDE_NOTIFICATION' });
}

function* fetchBlogs() {
  const blogRsp = yield BlogService.getAll();
  const data = blogRsp.data.sort(
    (a,b) => a.likes === b.likes ? 0 : (a.likes > b.likes ? -1 : 1 )
  );
  yield put({
    type: 'BLOGS_RECEIVED',
    data
  });
}

function* actionWatcher() {
  yield takeLatest('FETCH_BLOGS', fetchBlogs);
  yield takeLatest('SET_NOTIFICATION', setNotification);
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}