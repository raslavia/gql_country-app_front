import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "./gql";

interface Props {
  postId: string;
}

interface PropsMutation {
  postId: string;
  body: string;
}

const CommentForm: React.FC<Props> = ({ postId }) => {
  const [commentBody, setComment] = useState("");

  const [createComment] = useMutation<PropsMutation>(CREATE_COMMENT, {
    variables: { postId, body: commentBody },
    onError: err => {
      console.log(err.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createComment();
    setComment("");
  };

  const styles = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div style={styles}>
      <p style={{ padding: "0 15px 0 0" }}>Add comment:</p>
      <form onSubmit={handleSubmit} style={styles}>
        <input
          name='body'
          type='text'
          onChange={handleChange}
          value={commentBody}
          placeholder='comment'
          required
        />
        <button type='submit' disabled={commentBody.trim() === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
