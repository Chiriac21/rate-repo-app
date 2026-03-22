import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
        edges {
        node {
            description
            fullName
            language
            ownerAvatarUrl
            ratingAverage
            reviewCount
            stargazersCount
            forksCount
        }
        }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      username
    }
  }
`;