import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
      _id
      username
      email
      # array of savedBooks instead of thoughts here!
      savedBooks {
        bookId
        authors
        description
        title
        image
       # link
      }
    }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      _id
      username
      email
      # array of savedBooks instead of thoughts here!
      savedBooks {
        bookId
        authors
        description
        title
        image
       # link
      }
    }
    token
  }
}
`;

export const ADD_BOOK = gql`
  mutation addBook($input: BookInput!) {
    addBook(input: $input) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
       # link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        # link
      }
    }
  }
`;