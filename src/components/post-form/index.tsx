import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { CREATE_POST } from "./gql";
import { GET_POSTS } from "../../pages/posts-page/gql";

import { Container, Title, Form, Input } from "../country-form/styles";

import { PostInterface } from "../post-component/interface";
type Props = {
  createPost: PostInterface;
};

const PostForm = () => {
  const history = useHistory();

  const [postBody, setPost] = useState("");

  const [createPost] = useMutation<Props>(CREATE_POST, {
    variables: { body: postBody },
    onError: err => {
      console.log(err.message);
    },
    update(proxy, result) {
      const data: { getPosts: PostInterface[] } | null = proxy.readQuery({
        query: GET_POSTS,
      });
      if (data?.getPosts && result.data?.createPost) {
        proxy.writeQuery({
          query: GET_POSTS,
          data: { getPosts: [result.data.createPost, ...data!.getPosts] },
        });
        setPost("");
        history.push("./posts");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPost(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPost();
  };

  const styles = {
    justifyContent: "center",
    display: "flex",
  };
  return (
    <div style={styles}>
      <Container>
        <Title>Add post:</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            name='body'
            type='text'
            onChange={handleChange}
            value={postBody}
            placeholder='comment'
            required
          />
          <button type='submit' disabled={postBody.trim() === ""}>
            Submit
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default PostForm;
