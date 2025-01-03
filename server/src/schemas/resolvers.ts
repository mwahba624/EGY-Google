// import { signToken, AuthenticationError } from '../utils/auth.js'; 
// import User from '../models/index.js';

// // Define types for the arguments
// interface AddUserArgs {
//     input:{
//         username: string;
//         email: string;
//         password: string;
//     }
// }

// interface LoginUserArgs {
//     email: string;
//     password: string;
// }

// const resolvers = {
// Query: {
//     // Query to get the authenticated user's information
//     // The 'me' query relies on the context to check if the user is authenticated
//     me: async (_parent: any, _args: any, context: any) => {
//         // If the user is authenticated, find and return the user's information 
//         if (context.user) {
//             return User.findOne({ _id: context.user._id });
//         }
//         // If the user is not authenticated, throw an AuthenticationError
//         throw new AuthenticationError('Could not authenticate user.');
//     },
// },
//   Mutation: {
//     addUser: async (_parent: any, { input }: AddUserArgs) => {
//       // Create a new user with the provided username, email, and password
//       const user = await User.create({ ...input });
    
//       // Sign a token with the user's information
//       const token = signToken(user.username, user.email, user._id);
    
//       // Return the token and the user
//       return { token, user };
//     },
    
//     login: async (_parent: any, { email, password }: LoginUserArgs) => {
//       // Find a user with the provided email
//       const user = await User.findOne({ email });
    
//       // If no user is found, throw an AuthenticationError
//       if (!user) {
//         throw new AuthenticationError('Could not authenticate user.');
//       }
    
//       // Check if the provided password is correct
//       const correctPw = await user.isCorrectPassword(password);
    
//       // If the password is incorrect, throw an AuthenticationError
//       if (!correctPw) {
//         throw new AuthenticationError('Could not authenticate user.');
//       }
    
//       // Sign a token with the user's information
//       const token = signToken(user.username, user.email, user._id);
    
//       // Return the token and the user
//       return { token, user };
//     },
//     addBook: async (_parent: any, { input }: any, context: any) => {
//       // If the user is authenticated, find and update the user's information
//       if (context.user) {
//       return User.findOneAndUpdate(
//         { _id: context.user._id },
//         { $addToSet: { savedBooks: input } },
//         { new: true, runValidators: true }
//       );
//       }
//       // If the user is not authenticated, throw an AuthenticationError
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     removeBook: async (_parent: any, { bookId }: any, context: any) => {
//       // If the user is authenticated, find and update the user's information
//       if (context.user) {
//         return User.findOneAndUpdate(
//           { _id: context.user._id },
//           {$pull: { savedBooks: { bookId } },},
//           { new: true }
//         );
//       }
//       // If the user is not authenticated, throw an AuthenticationError
//       throw new AuthenticationError('You need to be logged in!');
//     }
//   },
// };

// export default resolvers;
import { AuthenticationError } from '../utils/auth.js';
import User from '../models/index.js';
import { signToken } from '../utils/auth.js';

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addBook: async (_parent: any, { input }: any, context: any) => {
      if (context.user) {
        return User.User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBook: async (_parent: any, { bookId }: any, context: any) => {
      if (context.user) {
        return User.User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};


export default resolvers;
