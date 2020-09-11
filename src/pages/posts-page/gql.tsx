import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
      }
    }
  }
`;

