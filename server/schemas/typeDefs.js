const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        post: [Post]
    }


`;

//Reference Format:

// type Post {
//     postId: ID!
//     petId: Pet
    
//     authors: [String]
//     description: String
//     bookId: String!
//     image: String
//     link: String
//     title: String!
// }

// type Auth {
//     token: ID!
//     user: User
//   }

// type Query {
//     me(userId: ID!): User
// }

// type Mutation {
//     addUser(username: String!, email: String!, password: String!): Auth
//     login(email: String!, password: String!): Auth
//     saveBook(authors: [String], description: String, title: String!, bookId: String!, image: String, link: String): User
//     removeBook(bookId: String!): User
//   }