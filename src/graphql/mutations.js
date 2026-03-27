import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation Authenticate(
    $credentials: AuthenticateInput
  ) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $review: CreateReviewInput
  ) {
    createReview(review: $review) {
      createdAt
      id
      rating
      text
      repository {
        url
        name
      }
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $user: CreateUserInput
  ) {
    createUser(user: $user) {
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview(
    $deleteReviewId: ID!
  ) {
    deleteReview(id: $deleteReviewId) 
  }
`;