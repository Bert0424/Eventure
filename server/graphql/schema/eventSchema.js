import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # ===================
  # Queries and Mutations for the Application
  # ===================
  # Types
  # ===================
  type User {
    id: ID!
    username: String!
    email: String!
    rsvps: [RSVP]
    hostedEvents: [UserEvent]
  }

  type RSVP {
    id: ID!
    ticketmasterId: String
    userEvent: UserEvent
    user: User!
  }

  type UserEvent {
    id: ID!
    title: String!
    description: String
    date: String
    time: String
    mood: String
    location: String
    creator: User!
  }

  type TicketmasterEvent {
    ticketmasterId: String!
    name: String!
    date: String
    time: String
    description: String
    image: String
    category: String
    venue: String
    city: String
    url: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  # ===================
  # Queries
  # ===================
  type Query {
    me: User

    # Ticketmaster queries
    events(keyword: String, city: String): [TicketmasterEvent]

    # App data
    savedEvents: [RSVP]
    myHostedEvents: [UserEvent]
    allUserEvents: [UserEvent]
  }

  # ===================
  # Mutations
  # ===================

  type Mutation {
    # Auth
    register(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    # RSVPs
    rsvpToTicketmasterEvent(ticketmasterId: String!): RSVP
    cancelRsvp(ticketmasterId: String!): Boolean

    rsvpUserEvent(userEventId: ID!): RSVP
    cancelUserEventRsvp(userEventId: ID!): Boolean

    # Hosted Events
    createUserEvent(
      title: String!
      description: String
      date: String
      time: String
      mood: String
      location: String
    ): UserEvent

    updateUserEvent(
      id: ID!
      title: String
      description: String
      date: String
      time: String
      mood: String
      location: String
    ): UserEvent

    deleteUserEvent(id: ID!): Boolean
  }
`;
