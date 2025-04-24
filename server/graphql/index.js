import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema/eventSchema.js';
import { resolvers } from './resolvers/index.js';
import jwt from 'jsonwebtoken';

export const createApolloServer = async (app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const authHeader = req.headers.authorization || '';
            const token = authHeader.split(' ')[1];
            if (!token) return {};
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return { user };
            } catch (err) {
                console.error('Invalid token', err);
                return {};
            }
            }
        });
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    console.log(`GraphQL server ready at http://localhost:5000/graphql`);
};