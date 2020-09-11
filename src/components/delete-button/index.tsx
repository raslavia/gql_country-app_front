import React from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { Button } from "./styles";
import { DELETE_POST, DELETE_COMMENT } from "./gql";
import { GET_POSTS } from "../../pages/posts-page/gql";

import { PostInterface } from "../post-component/interface";

interface Props {
  postId: string;
  commentId?: string;
}
type Data = {
  getPosts: PostInterface[];
};

const DeleteButton: React.FC<Props> = ({ postId, commentId }) => {
  const history = useHistory();

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostMutation] = useMutation(mutation, {
    onError: err => console.log(err.message),
    update: (proxy, result) => {
      if (!commentId) {
        const data: Data | null = proxy.readQuery({
          query: GET_POSTS,
        });
        const newData = data!.getPosts.filter(post => post.id !== postId);
        proxy.writeQuery({
          query: GET_POSTS,
          data: { getPosts: newData },
        });
        history.push("/posts");
      }
    },
    variables: { postId, commentId },
  });

  const deletePostFunc = () => {
    const confirmBool = window.confirm("Are you sure?");
    if (confirmBool) {
      deletePostMutation();
    } else return;
  };

  return <Button onClick={deletePostFunc}>X</Button>;
};

export default DeleteButton;

// const [deletePostMutation] = useMutation(mutation, {
//   onError: err => console.log(err.message),
//   update: (proxy, result) => {
//     if (!commentId && result.data?.deletePost) {
//       const data: { getPosts: PostInterface[] } | null = proxy.readQuery({
//         query: GET_POSTS,
//       });
//       if (data?.getPosts && result.data?.deletePost) {
//         data!.getPosts = data!.getPosts.filter(post => post.id !== postId);
//         proxy.writeQuery({ query: GET_POSTS, data });
//         console.log("historu");
//         history.push("/posts");
//       }
//     }
//   },
//   variables: { postId, commentId },
// });
