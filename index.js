import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'
import resolvers from './resolvers'
import models from './models'

const SECRET = 'thisisasecret';


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})




const PORT = 3000;
const app = express();

const addUser = async(req, res) => {
    const token = req.headers['authentication'];
    try {
        jwt.verify(token, SECRET)
    }catch(error){
        console.log(error)
    }
}



app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { models, SECRET }}),);


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));


console.log("WORKING!!!!!!")
models.sequelize.sync().then(() => app.listen(PORT));