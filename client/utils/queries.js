import { gql } from "@apollo/client";

export const GET_USERS = gql`
query getUsers {
    users {
      _id
      username
      email
      post {
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

export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      post {
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
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      post {
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
  }
`;

export const GET_POSTS = gql`
query getPosts {
  post {
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

export const GET_POST = gql`
query getPost($postId: ID!) {
  post(postId: $postId) {
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
    replies {
      message
      username
    }
  }
}
`;
