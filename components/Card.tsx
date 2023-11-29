import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Router from "next/router";

export type PostProps = {
  id: number;
  title: string;
  content?: string;
  img?: string;
  resume?: string;
  published: boolean;
};

export default function ImgMediaCard({ post }) {
  const cardImg = `../static/img/${post.img}`;

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }} onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={cardImg}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.resume}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
