import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($orderBy: AllRepositoriesOrderBy, 
  $orderDirection: OrderDirection,
  $searchKeyword: String,
  $after: String, 
  $first: Int){
    repositories (orderBy: $orderBy, 
    orderDirection: $orderDirection,
    searchKeyword: $searchKeyword,
    after: $after, 
    first: $first){
        edges {
        node {
            id
            description
            fullName
            language
            ownerAvatarUrl
            ratingAverage
            reviewCount
            stargazersCount
            forksCount
          }
        cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
    }
  }
`;

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false, 
  $first: Int, 
  $after: String) {
    me {
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
              repository {
                id
              }
          }
        cursor
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      description
      fullName
      language
      ownerAvatarUrl
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      url
      reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
    }
  }
`;