import { gql } from "@apollo/client";

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      likes {
        id
        username
      }
      likeCount
      
    }
  }
`;
