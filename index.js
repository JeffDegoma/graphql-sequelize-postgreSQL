import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools'
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';


import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'
import jwt from 'jsonwebtoken'

const SECRET = 'thisisasecret';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


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

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.use('/graphql', bodyParser.json(), graphqlExpress(req =>({ 
    schema, 
    context: { 
        models, 
        SECRET,
        user: req.user, 
    }
    })),
);

const server = createServer(app)

console.log("WORKING!!!!!!")
models.sequelize.sync().then(() => server.listen(3000, () => {
    new SubscriptionServer({
        execute,
        subscribe,
        schema
    },
    {
        server,
        path:'/subscriptions'
    }
    )
}));

