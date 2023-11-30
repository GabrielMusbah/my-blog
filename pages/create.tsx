import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { Typography, TextField, Button, Box } from "@mui/material";

export default function Draft() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [resume, setResume] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, img: image, resume };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div >
        <form onSubmit={submitData}>
          <Typography variant="h6" sx={{ marginTop: '100px', marginBottom: '30px' }}>
            Criar novo post
          </Typography>

          {/* Input para o título */}
          <TextField
            fullWidth
            autoFocus
            label="Titulo"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Textarea para o conteúdo */}
          <TextField
            fullWidth
            label="Subtitulo"
            variant="outlined"
            margin="normal"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Conteudo"
            variant="outlined"
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Input para a imagem */}
          <TextField
            fullWidth
            label="Image URL"
            variant="outlined"
            margin="normal"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          {/* Input para o resumo */}


          {/* Botões em linha */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '50px' }}>
            {/* Botão para criar o post */}
            <Button
              disabled={!content || !title || !image || !resume}
              type="submit"
              variant="contained"
              color="primary"
            >
              Postar
            </Button>

            {/* Link para cancelar */}
            <Typography variant="body2">
              <a href="#" onClick={() => Router.push("/")}>
                Cancelar
              </a>
            </Typography>
          </Box>
        </form>
      </div>
    </Layout>
  );
}
