import { authResolvers } from './authResolvers.js';
import { userResolvers } from './userResolvers.js';
import { commentResolvers } from './commentResolvers.js';
import { rsvpResolvers } from './rsvpResolvers.js';
import { eventResolvers } from './eventResolvers.js';



export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...commentResolvers.Query,
        ...eventResolvers.Query,

    },
    Mutation: {
        ...authResolvers.Mutation,
        ...eventResolvers.Mutation,
        ...rsvpResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
};