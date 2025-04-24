import { gql } from "@apollo/client";

// Mutations for creating and deleting events

export const CREATE_EVENT = gql`
    mutation CreateEvent($input: EventInput!) {
        createEvent(input: $input) {
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


export const DELETE_EVENT = gql`
    mutation DeleteEvent($ticketmasterId: String!) {
        deleteEvent(ticketmasterId: $ticketmasterId) {
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

/*export const DELETE_EVENT = gql`
    mutation DeleteEvent($id: ID!) {
        deleteUserEvent(id: $id) {
        }
    }
`;*/
