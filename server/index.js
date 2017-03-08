import {createApolloServer} from 'meteor/apollo';
import {makeExecutableSchema} from 'graphql-tools';
import schema from './schema';
import resolvers from './resolvers';
import ChannelRepository from './connectors';


const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});


createApolloServer({
  schema: executableSchema,
  context: {
    Channels: new ChannelRepository(),
  }

});
