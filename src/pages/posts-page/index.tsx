import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context";

import { PostsContainer } from "./styles";
import Post from "../../components/post-component";
import PostForm from "../../components/post-form";

import { useQuery } from "@apollo/client";
import { GET_POSTS } from "./gql";
import { PostInterface } from "../../components/post-component/interface";

export interface PostsArrInterface {
  getPosts: PostInterface[];
}

const PostsPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery<PostsArrInterface>(GET_POSTS);
  //add fetchPolicy for checking network not cache
  // const { loading, error, data } = useQuery<PostsArrInterface>(GET_POSTS, {
  //   fetchPolicy: "network-first",
  // });

  return (
    <div>
      {user && <PostForm />}
      {error ? { error } : ""}
      {loading ? "Loading..." : ""}
      <PostsContainer>
        {data?.getPosts.map(post => (
          <div key={post.id} style={{ position: "relative" }}>
            <Link
              to={`posts/${post.id}`}
              style={{ position: "absolute", right: "5px" }}
            >
              Check
            </Link>
            <Post post={post} />
          </div>
        ))}
      </PostsContainer>
    </div>
  );
};

export default PostsPage;
