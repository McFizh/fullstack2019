const blogs = [
  {
    title: 'test title',
    author: 'test author',
    url: 'www.google.fi',
    likes: 10,
    id: '1234'
  }
];

const getAll = () => {
  return Promise.resolve({ data: blogs });
};

const setToken = () => { };


export default { getAll, setToken };