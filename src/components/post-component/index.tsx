import React from "react";
import moment from "moment";

import LikeButton from "../like-button";
import { PostDiv, LikesCommentsDiv, CommentsDiv, PostBody } from "./styles";
import { ReactComponent as Comments } from "../../utilis/comment.svg";

import { PostInterface } from "./interface";

type PostType = {
  post: PostInterface;
};

const Post: React.FC<PostType> = ({ post }) => {
  const {
    username,
    body,
    commentCount,
    createdAt,
  }: PostInterface = post;

  return (
    <PostDiv>
      <h3 style={{ margin: "0" }}>{username}</h3>
      <PostBody>{body}</PostBody>
      <LikesCommentsDiv>
        <CommentsDiv>
          {commentCount} <Comments style={{ height: "20px", width: "auto" }} />
        </CommentsDiv>
        {post && (
          <LikeButton post={post} />
        )}
      </LikesCommentsDiv>
      <p>{moment(createdAt).fromNow()}</p>
    </PostDiv>
  );
};

export default Post;
