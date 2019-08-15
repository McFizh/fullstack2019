export const fetchBlogs = () => ({
  type: 'FETCH_BLOGS'
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