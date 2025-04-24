import { gql } from '@apollo/client';


export const GET_EVENTS = gql`
  query GetEvents($keyword: String, $city: String) {
    events(keyword: $keyword, city: $city) {
      ticketmasterId
      name
      date
      time
      description
      image
      category
      venue
      city
      url
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($ticketmasterId: String!) {
    eventByTicketmasterId(ticketmasterId: $ticketmasterId) {
      ticketmasterId
      name
      date
      time
      description
      image
      category
      venue
      city
      url
    }
  }
`;
