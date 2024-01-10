import { gql } from '@apollo/client';

export const GET_USERS = gql`
query getUsers {
    users {
      _id
      username
      email
      post: {
        _id
        message
        location
        petId: {
          _id
          type
          name
          img
          lastSeen
          species
        }
    }
}
`

export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      post: {
        _id
        message
        location
        petId: {
            _id
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;

export const GET_PETS = gql`
query getPets {
    pets {
      _id
      type
      name
      img
      lastSeen
      species
    }
}
`

export const GET_POSTS = gql`
query getPosts {
  post {
    _id: ID!
    message: String!
    location: String!
    petId {
      type
      name
      img
      lastSeen
      Species
    }
    replies: {
      message
      username
    }
  }
}
`

export const GET_PET = gql`
query getPet {
  pets() {
    _id
    type
    name
    img
    lastSeen
    species
  }
}
`

export const GET_POST = gql`
query getPost {
  post(postId: $ID) {
    _id: ID!
    message: String!
    location: String!
    petId {
      type
      name
      img
      lastSeen
      Species
    }
    replies: {
      message
      username
    }
  }
}
`