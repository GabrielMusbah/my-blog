import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import ImgMediaCard from "../components/Card";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

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
        <Typography variant="h6" sx={{ marginTop: '100px', marginBottom: '50px' }}>
          Fique por dentro das novidades!!!
        </Typography>
        <main>
          <Grid container spacing={5} className="post">
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
