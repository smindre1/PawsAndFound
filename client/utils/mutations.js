import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($message: String!, $location: String!, $pet: PetData) {
    addPost(message: $message, location: $locaion, pet: $pet) {
      _id
      message
      location
      pet {
        type
        name
        img
        lastSeen
        species
      }
    }
  }
`;

export const DEL_POST = gql`
  mutation delPost($postId: ID!) {
    delPost(postId: $postId) {
      _id
      message
      location
      pet {
        type
        name
        img
        lastSeen
        species
      }
    }
  }
`;
//The reply mutation is suppose to return Post but I'm not sure if it is able to... Test this out later.
export const ADD_REPLY = gql`
  mutation addReply($postId: ID!, $message: String!, $username: String!) {
  addReply( postId: $postId, message: $message, username: $username) {
    postId
    message
    username
  }
}
`;
