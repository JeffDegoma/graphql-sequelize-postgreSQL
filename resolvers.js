export default {
    Query: {
        allUsers: (parent, args, { models }) => models.User.findAll(),
        getUser: (parent, { username }, { models }) => 
            models.User.findOne({ 
                where: {
                    username,
                }
        }),
        userBoards: (parent, { owner }, { models }) => 
            models.Boards.findAll({
                where:{
                    username,
                }
        }),
        userSuggestions: (parent, { creatorId }, { models }) => 
            models.Suggestion.findAll({
                where:{
                    creatorId,
                }
        }),

    },

    Mutation: {
        createUser: (parent, args, { models }) => models.User.create(args),
        updateUser: (parent, { username, newUsername }, { models }) =>
            models.User.update({ username, newUsername }, {where: { username } }),
        deleteUser: (parent, args, { models }) => 
            models.User.destroy({where: args}),
        createBoard: (parent, args, { models }) => models.Board.create(args),
        createSuggestion: (parent, args, { models }) =>
            models.Suggestion.create(args)
    }
}