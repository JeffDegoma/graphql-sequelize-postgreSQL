export default `
    
    type Query {
        allUsers: [User!]!
        getUser(username: String!): User
    }

    type User {
        id: Int!
        username: String!
        createdAt: String!
        updatedAt: String!
    }

    type Mutation {
        createUser(username: String!): User
        updateUser(username: String!): [Int!]!
        deleteUser(username: String!): Int!
    }

`