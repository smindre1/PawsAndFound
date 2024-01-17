# Pet-Lost-And-Found

Summary: This is a reactive MERN application using Apollo to run GraphQL API queries on our backend server.

Purpose For Our App: We have created a lost and found pet blog in which users can post and reply about animals they have lost or found.

# Table of Contents

- [Model Plans](#model-plans)

- [Things to Check](#things-to-check)

- [Issues](#issues)

- [Technologies](#technologies)

- [Usage](#usage)

- [Credits](#credits)

- [Deployed Application](#deployed-application)

## GraphQL TypeDefs (Model Blueprints)
```
type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        post: [Post]
    }

    type Post {
        _id: ID!
        username: String!
        message: String!
        location: String!
        pet: Pets
        replies: [Replies]
    }

    type Pets {
        type: String!
        name: String
        img: String
        lastSeen: String!
        species: String!
    }

    type Replies {
        postId: ID!
        message: String!
        username: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input PetData {
        type: String!
        name: String
        img: String
        lastSeen: String!
        species: String!
    }

    type Query {
        users: [User]
        me: User
        posts: [Post]
        post(postId: ID!): Post
        lostPets: [Post]
        foundPets: [Post]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addPost(username: String!, message: String!, location: String!, pet: PetData): Post
        delPost(postId: ID!): Post
               
        addReply( postId: ID!, message: String!, username: String!): Post
    }
```


## Things to Check:

//Seed file
//CSS
//README.md file
//Presentation

/Adding images


//Add dates to posts

## Issues
//If a user is in the middle of making a post and they are logged out it will reload the page/redirect page and erase progress on that user's post.

## Technologies

- React
- GraphQL
- Node.js
- Express.js
- MongoDB
- Heroku

## Usage

- `AS` A USER who has lost/found a pet:
	- `WHEN` I enter the application
	- `THEN` I am able to view posts regarding lost/found pets
	- `WHEN` I go to the navigation bar
	- `THEN` I have the option to login or sign up
	- `WHEN` I am logged in
	- `THEN` I am able to create a post `OR` reply to a post

## Credits

This application was created as the last group project for Columbia Engineering Coding Bootcamp.

Contibutors: 
- [Shane Mindreau](https://github.com/smindre1)
- [Brandon Rivera](https://github.com/BrandonERivera)
- [Nat Rodriguez](https://github.com/Nat-Rodriguez)

## Deployed Application

[Click here to view the deployed application](https://pawsandfound-dd3dbebb5f23.herokuapp.com/)
