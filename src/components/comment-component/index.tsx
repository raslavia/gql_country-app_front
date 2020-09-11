import React from "react";
import moment from "moment";
import { CommentBody, CommentDiv } from "./styles";

import {CommentInterface} from '../post-component/interface'

interface Props {
    comment: CommentInterface
}

const Comment: React.FC <Props> = ({comment:{username, body, createdAt, id }}) => {
  return (
    <CommentDiv>
      <p>{username}</p>
      <CommentBody>{body}</CommentBody>
      <p>{moment(createdAt).fromNow()}</p>
    </CommentDiv>
  );
};

export default Comment;
