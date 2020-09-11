import { gql } from "@apollo/client";

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      username
      body
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
      }
      likeCount
      commentCount
    }
  }
`;