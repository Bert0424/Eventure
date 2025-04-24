import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($eventId: ID!) {
    comments(eventId: $eventId) {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;