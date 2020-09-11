import React, { useContext } from "react";
import { RouteComponentProps } from "react-router";

import { AuthContext } from "../../context";

import Post from "../../components/post-component";

import DeleteButton from "../../components/delete-button";
import Comment from "../../components/comment-component";
import CommentForm from "../../components/comment-form";

import { useQuery } from "@apollo/client";
import { GET_POST } from "./gql";
import { PostInterface } from "../../components/post-component/interface";
import { UserType } from "../home-page/interface";

interface PostInterfaceQuery {
  getPost: PostInterface;
}

interface Variable {
  postId: string;
}

interface MatchParams {
  id: string;
}
interface Props extends RouteComponentProps<MatchParams> {}

const PostPage = (props: Props) => {
  const { id } = props.match.params;
  const context: UserType = useContext(AuthContext);

  const { loading, error, data } = useQuery<PostInterfaceQuery, Variable>(
    GET_POST,
    {
      variables: { postId: id },
    }
  );
  console.log("porps", props);

  return (
    <div style={{ position: "relative" }}>
      {loading ? "loading" : ""}
      {error ? { error } : ""}
      {data?.getPost &&
        context.user?.username === data.getPost.username && (
          <DeleteButton postId={data.getPost.id} />
        )}
      {data?.getPost && <Post post={data.getPost} />}
      {data && <CommentForm postId={data.getPost.id} />}

      {context.user &&
        data?.getPost?.comments?.map(c => (
          <div key={c.id} style={{ position: "relative" }}>
            {context.user?.username === c.username && (
              <DeleteButton postId={data.getPost.id} commentId={c.id} />
            )}
            <Comment comment={c} />
          </div>
        ))}
    </div>
  );
};

export default PostPage;
