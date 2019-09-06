import { put, takeLatest, all, delay } from 'redux-saga/effects';
import BlogService from './services/blogs';
import LoginService from './services/login';
import UsersService from './services/users';

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

function* fetchUsers() {
  const usersRsp = yield UsersService.getAll();
  yield put({
    type: 'USERS_LOADED',
    data: usersRsp.data
  });
}

function* likeBlog({ blog }) {
  try {
    yield BlogService.likeAction(blog.id, blog.likes+1);
    yield put({ type: 'FETCH_BLOGS' });
  } catch(err) {
    console.log(err);
  }
}

function* removeBlog({ blog }) {
  try {
    yield BlogService.remove(blog.id);
    yield put({ type: 'FETCH_BLOGS' });
    yield put({ type: 'BLOG_REMOVED' });
  } catch(err) {
    console.log(err);
  }
}

function* createBlog({ blog }) {
  const { title, author, url, resetCallbacks } = blog;
  try {
    yield BlogService.createBlog({ title, author, url });

    resetCallbacks.resetAuthor();
    resetCallbacks.resetTitle();
    resetCallbacks.resetUrl();
    resetCallbacks.hideBlogForm();

    const notification = {
      message: `New blog '${title.value}' created`,
      type: 'success',
      delay: 3
    };
    yield put({ type: 'SET_NOTIFICATION', notification });
    yield put({ type: 'FETCH_BLOGS' });
  } catch(err) {
    const notification = {
      message: 'Blog creation failed',
      type: 'error',
      delay: 3
    };
    yield put({ type: 'SET_NOTIFICATION', notification });
  }
}

function* loginUser({ credentials }) {
  const { username, password, resetCallbacks } = credentials;

  try {
    const res = yield LoginService.login({ username, password });
    window.localStorage.setItem( 'appUser', JSON.stringify(res.data) );
    BlogService.setToken(res.data.token);
    resetCallbacks.resetUsername();
    resetCallbacks.resetPassword();
    yield put({ type: 'FETCH_USERS' });
    yield put({ type: 'LOGIN_SUCCESS', data: res.data });
  } catch(err) {
    const notification = {
      message: 'Wrong username/password',
      type: 'error',
      delay: 3
    };
    yield put({ type: 'SET_NOTIFICATION', notification });
    yield put({ type: 'LOGIN_FAILURE' });
  }
}

function *logoutUser() {
  window.localStorage.removeItem('appUser');
  BlogService.setToken('');
  yield put({ type: 'LOGOUT_SUCCESS' });
}

function *storeUser({ user }) {
  BlogService.setToken(user.token);
  yield put({ type: 'FETCH_BLOGS' });
  yield put({ type: 'FETCH_USERS' });
  yield put({ type: 'STORE_SUCCESS', user });
}

function* actionWatcher() {
  yield takeLatest('FETCH_BLOGS', fetchBlogs);
  yield takeLatest('CREATE_BLOG', createBlog);
  yield takeLatest('LIKE_BLOG', likeBlog);
  yield takeLatest('REMOVE_BLOG', removeBlog);
  yield takeLatest('SET_NOTIFICATION', setNotification);

  yield takeLatest('STORE_USER', storeUser);
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);

  yield takeLatest('FETCH_USERS', fetchUsers);
}

export default function* rootSaga() {
  yield all([
    actionWatcher()
  ]);
}