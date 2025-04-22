import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/eventschema.js';
import { resolvers } from './resolvers/index.js';

export const createApolloServer = async (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
        });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    console.log(`GraphQL server ready at http://localhost:5000/graphql`);
};