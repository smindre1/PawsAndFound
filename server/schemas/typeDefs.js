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
`;

module.exports = typeDefs;