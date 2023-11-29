import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import ImgMediaCard from "../components/Card";
import Grid from '@mui/material/Grid';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    }
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Novidades</h1>
        <main>
          <Grid container spacing={2} className="post">
            {props.feed.map((post) => (
              <ImgMediaCard key={post.id} post={post} />
            ))}
          </Grid>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: rgb(214 227 227);
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post {
          margin-bottom: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
