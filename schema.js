export default `

    type Subscription {
        userAdded: User!
    }

    type Suggestion {
        id: Int!
        text: String!
        creatorId: Int!
        creatorUsername: String!
    }

    type Board {
        id: Int!
        name: String!
        suggestions: [Suggestion!]!
        owner: Int!
    }
    
    type Query {
        allUsers: [User!]!
        me: User
        userBoards(owner: String!): Board
        userSuggestions(creatorId: String!): [Suggestion!]!
    } 

    type User {
        id: Int!
        username: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        boards: [Board!]!
        suggestions: [Suggestion!]!
    }

    type Mutation {
        updateUser(username: String!, newUsername: String! ): [Int!]!
        deleteUser(username: String!): Int!
        createBoard(owner: Int!, name: String): Board!
        createSuggestion(creatorId: Int!, text: String, boardId: Int!): Suggestion!
        register(username: String!, email: String!, password: String!): User!
        login(email: String!, password: String!): String!
        createUser(user: String!): User!

    }

    schema {
        query: Query
        mutation: Mutation
        subscription: Subscription
    }

`