import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'
import jwt from 'jsonwebtoken'

const SECRET = 'thisisasecret';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})



const PORT = 3000;
const app = express();

const addUser = async (req ) => {
    const token = req.headers.authorization
    console.log('TOKENNNNN', token)
    try {
        const { user } =  await jwt.verify(token, SECRET)
        req.user = user;
    }   catch(error)   {
        console.log(error)
    }
    req.next()
}

app.use(addUser)


app.use('/graphql', bodyParser.json(), graphqlExpress(req =>({ 
    schema, 
    context: { 
        models, 
        SECRET,
        user: req.user, 
    }
    })),
);


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));


console.log("WORKING!!!!!!")
models.sequelize.sync().then(() => app.listen(PORT));