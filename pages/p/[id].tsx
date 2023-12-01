import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { useSession } from "next-auth/react";
import { User, CalendarBlank } from "@phosphor-icons/react";



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: true
    },
  });
  return {
    props: post,
  };
};


async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}


async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}


const Post: React.FC<PostProps> = (props) => {
  const { status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }


  const imgUrl = `../static/img/${props.img}`


  return (
    <Layout>
      <div className="post-container">
        <h2>{props.title}</h2>
        <h3>{props.subtitle}</h3>
        <p className="pAuthor" > <span> <User size={16} color="#164e63" weight="bold" /> {props.author.name} </span>   | <CalendarBlank size={16} color="#164e63" weight="bold" /> {props.date}</p>
        <img src={imgUrl} alt={props.title} className="post-image" />
        <p>{props.content}</p>
      </div>


      <style jsx>{`
        .post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          margin-top: 80px;
        }

        .pAuthor {
          color: #0891b2;
          font-size: 15px;
          font
        }

        .pAuthor span {
          color: #0891b2;
          font-weight: 600;

        }


        h2 {
          font-size: 3rem;
          margin-bottom: 10px;
        }


        h3 {
          font-size: 20px;
          margin-bottom: 15px;
        }


        .post-image {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
        }


        p {
          font-size: 1.2rem;
          line-height: 1.6;
        }
      `}</style>
    </Layout>
  );
};


export default Post;