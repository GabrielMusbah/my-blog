import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  title: string;
  content?: string;
  img?: string;
  resume?: string;
  published: boolean;
  date: string;
  url: string;
  subtitle: string;
  author: {
    name: string;
  }
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
