import { authResolvers } from './authResolvers.js';
import { userResolvers } from './userResolvers.js';
import { rsvpResolvers } from './rsvpResolvers.js';
import { resolvers as eventResolvers } from './eventResolvers.js';



export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...eventResolvers.Query,
    },
    Mutation: {
        ...authResolvers.Mutation,
        ...eventResolvers.Mutation,
        ...rsvpResolvers.Mutation,
    },
};