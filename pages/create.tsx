import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import router from "next/router";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Draft() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [resume, setResume] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = () => {
      setBase64(fileReader.result as string);
    };
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const submitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    // Você pode enviar o base64 para o seu servidor aqui
    await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, content, img: base64, resume }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Limpe os estados após o envio
    setFile(null);
    setBase64(null);

    // Redirecione após o envio
    await router.push("/");
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
            label="Resumo"
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

          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" value={image} onChange={onFileChange} />
          </Button>

          {/* Input para o resumo */}


          {/* Botões em linha */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '50px' }}>
            {/* Botão para criar o post */}
            <Button
              disabled={!content || !title || !resume}
              type="submit"
              variant="contained"
              color="primary"
            >
              Postar
            </Button>

            {/* Link para cancelar */}
            <Button
              variant="contained"
              color="error"
              onClick={() => Router.push("/")}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </div>
    </Layout>
  );
}
