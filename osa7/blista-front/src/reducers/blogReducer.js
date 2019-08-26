export const fetchBlogs = () => ({
  type: 'FETCH_BLOGS'
});

export const createBlog = (blog) => ({
  type: 'CREATE_BLOG',
  blog
});

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'BLOGS_RECEIVED':
      return action.data;
    default:
      return state;
  }
};

export default reducer;