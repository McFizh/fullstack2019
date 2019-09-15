export const fetchBlogs = () => ({
  type: 'FETCH_BLOGS'
});

export const createBlog = (blog) => ({
  type: 'CREATE_BLOG',
  blog
});

export const likeBlog = (blog) => ({
  type: 'LIKE_BLOG',
  blog
});

export const removeBlog = (blog) => ({
  type: 'REMOVE_BLOG',
  blog
});

export const commentBlog = (blog, comment) => ({
  type: 'COMMENT_BLOG',
  blog,
  comment
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