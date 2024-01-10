import { gql } from '@apollo/client';

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

export const ADD_PET = gql`
mutation petData ($input: petData!) {
    petData(input: $petData) {
        _id
        type
        name
        img
        lastSeen
        species
    }
  }
  `;
export const ADD_POST = gql`
mutation addPost(message: String!, location: String!, petId: PetData)
addPost(message: $message, location: $locaion, petId: $pedId) {
    _id
    message
    location
    petId
    {
      type
      name
      img
      lastSeen
      Species
    }
}

`

export const DEL_POST = gql`
mutation delPost($PostId: ID!) {
  delPost(PostId: $PostId) {
    _id
    message
    location
    petId
    {
      type
      name
      img
      lastSeen
      Species
    }
  }
  }
`

export const ADD_REPLY = gql`
  mutation addReply( postId: ID!, message: String!, username: String!) {
  addReply( postId: $postId, message: $message, username: $username) {
    _id
    postId
    message
    username
  }
}
`