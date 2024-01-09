const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        post: [Post]
    }

    type Post {
        _id: ID!
        message: String!
        location: String!
        petId: [Pets]
        replies: [Replies]
    }

    type Pets {
        _id: ID!
        type: String!
        name: String
        img: String!
        lastSeen: String!
        species: String!
    }

    type Replies {
        _id: ID!
        message: String!
        username: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input PetData {
        _id: ID!
        type: String!
        name: String
        img: String!
        lastSeen: String!
        species: String!
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        pets: [Pets]
        posts: [Post]
        pet(petId: ID!): Pets
        post(postId: ID!): Post
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addPost(message: String!, location: String!, petId: PetData): Post
        delPost(postId: ID!): Auth
               
        addReply( postId: ID!, message: String!, username: String!): Post
    }

`;

module.exports = typeDefs;