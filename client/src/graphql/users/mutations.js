import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
        register(email: $email, password: $password, username: $username) {
            token
            user{
                id
                email
                username
            }
        }
    }
`;
export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                id
                email
                username
            }
        }
    }
`;