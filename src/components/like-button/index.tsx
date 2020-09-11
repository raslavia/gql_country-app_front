import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "./gql";

import { ReactComponent as Heart } from "../../utilis/heart.svg";
import { ReactComponent as EmptyHeart } from "../../utilis/emptyHeart.svg";

import { AuthContext } from "../../context";

import { UserType } from "../../pages/home-page/interface";
import { PostInterface } from "../post-component/interface";

type Props = {
  post: PostInterface;
};
interface PropsMutation {
  postId: string;
}

const LikeButton: React.FC<Props> = ({ post: { id, likeCount, likes } }) => {
  const context: UserType = useContext(AuthContext);

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!context.user) return;

    if (
      context.user &&
      likes &&
      likes.find(like => like.username === context.user?.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [context.user, likes]);

  const [likePost] = useMutation<PropsMutation>(LIKE_POST, {
    onError: err => console.log(err.message),
    variables: { postId: id },
  });
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        width: "40px",
      }}
    >
      {likeCount}
      <button
        style={{
          backgroundColor: "transparent",
        }}
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          likePost()
        }
      >
        {liked ? (
          <Heart style={{ height: "20px" }} />
        ) : (
          <EmptyHeart style={{ height: "20px" }} />
        )}
      </button>
    </div>
  );
};

export default LikeButton;

// (
//   <Heart style={{ height: "20px" }} />
// ) : (
//   <EmptyHeart style={{ height: "20px" }} />
// )
