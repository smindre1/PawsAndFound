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

    type Query {
        users: [User]
        user(username: String!): User
        me: User
        pets: [Pets]: [Pets]
        posts: [Post]: [Post]
        pet(petId: ID!): Pets
        post(postId: ID!): Post
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        addPost(message: String!, location: String!, petId: [Pets]): Post
        delPost(postId: ID!)
        updatePost(postId: ID!, messge: String!, location: String!): Post

        addPet(type: String!, name: String, img: String!, lastSeen: String, species: String!): Pet
        delPet(petId: ID!)
        updatePet(petid: ID!, type: String!, name: String, img: String!, LastSeen: String, Species: String!): Pet

        addreply( postId: ID!, message: String!, username: String!): Post
    }

`;