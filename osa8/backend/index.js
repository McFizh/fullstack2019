const {
  ApolloServer, UserInputError, AuthenticationError, gql
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const Mongoose = require('mongoose');
const { PubSub } = require('apollo-server');

require('dotenv').config();

const AuthorModel = require('./models/author');
const BookModel = require('./models/book');
const UserModel = require('./models/user');

//
const JWT_TOKEN = process.env.SECRET;
const pubsub = new PubSub();

//
if(!process.env.DB_URL) {
  console.log('Unable to start. Set database address to DB_URL');
  process.exit(-1);
}

Mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then( () => {
  console.log('Connected to database....');
}).catch( (err) => {
  console.log('Unable to connect to database..', err);
  process.exit(-1);
});

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    allGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String
      published: Int
      author: String
      genres: [String]
    ): Book

    editAuthor(
      name: String
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => BookModel.collection.countDocuments(),
    authorCount: () => AuthorModel.collection.countDocuments(),

    allBooks: async (root, args) => {
      const findObj = {};

      if(args.author) {
        let author = await AuthorModel.findOne({ name: args.author });
        if(!author) { return []; }
        findObj['author'] = author._id;
      }

      if(args.genre) {
        findObj['genres'] = args.genre;
      }

      return BookModel
        .find(findObj)
        .populate('author', { name: 1, born: 1 });
    },
    allAuthors: () => {
      return AuthorModel.find();
    },
    allGenres: async () => {
      let books = await BookModel.find();
      let genres = books.map( book => book.genres ).flat();
      genres = genres.filter( (item,idx) => genres.indexOf(item) === idx );
      return genres;
    },
    me: (root, args, { currentUser }) => {
      return currentUser;
    }
  },

  Author: {
    bookCount: async (root) => {
      let author = await AuthorModel.findOne({ name: root.name });
      return BookModel.find({ author: author._id }).countDocuments();
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        let author = await AuthorModel.findOne({ name: args.author });
        if(!author) {
          author = new AuthorModel({ name: args.author });
          await author.save();
        }

        const model = new BookModel({ ...args, author: author._id });
        const book = await model.save();

        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        return book;
      } catch(err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      try {
        const author = await AuthorModel.findOne({ name: args.name });
        if(!author) { return null; }

        author.born = args.setBornTo;
        return author.save();
      } catch(err) {
        console.log(err);
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new UserModel({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        });
        return await user.save();
      } catch(err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await UserModel.findOne({ username: args.username });
      if(!user || args.password !== 'password') {
        throw new UserInputError('wrong credentials');
      }
      const UserToken = { id: user._id, username: user.username };
      return { value: jwt.sign(UserToken, JWT_TOKEN) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify( auth.substring(7), JWT_TOKEN );
      const currentUser = await UserModel.findById(decodedToken.id);
      return { currentUser };
    }
  }

});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
