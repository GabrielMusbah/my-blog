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
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => Router.push("/p/[url]", `/p/${post.url}`)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={cardImg}
        />
        <CardContent sx={{ flexGrow: 1 }}>
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
