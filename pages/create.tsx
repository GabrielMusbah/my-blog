import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { styled } from '@mui/material/styles';
import { Typography, TextField, Button, Box } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import router from "next/router";
import InputFileUpload from "../components/uploadFile";
import Modal from '@mui/material/Modal';

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
  const [subTitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [resume, setResume] = useState("");
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    console.log("teste")

    // Você pode enviar o base64 para o seu servidor aqui
    await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, subtitle: subTitle, content, img: base64, resume, url }),
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

  const generatePost = async () => {
    // Você pode enviar o base64 para o seu servidor aqui
    const result = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: JSON.stringify({ url: link }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      // Aguarde a conversão da resposta JSON
      const responseData = await result.json();

      console.log(responseData)

      setTitle(responseData.titulo)
      setSubTitle(responseData.subtitulo)
      setResume(responseData.resumo)
      setUrl(responseData.url)
      setContent(responseData.conteudo)

      handleClose()
    } else {
      handleClose()
    }
  }

  return (
    <Layout>
      <div >
        <form onSubmit={submitData}>

          <Typography variant="h6" sx={{ marginTop: '100px', marginBottom: '30px' }}>
            Criar novo post
          </Typography>

          <TextField
            fullWidth
            autoFocus
            label="Titulo"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Subtitulo"
            variant="outlined"
            margin="normal"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Resumo (subtitulo do card)"
            variant="outlined"
            margin="normal"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />

          <TextField
            fullWidth
            label="Url"
            variant="outlined"
            margin="normal"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>

            <InputFileUpload image={image} onFileChange={onFileChange} />

            <Button component="label" variant="contained" onClick={handleOpen} startIcon={<CloudUploadIcon />}>
              Use Chat
            </Button>
          </Box>


          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '50px' }}>

            <Button
              disabled={!content || !title || !resume}
              type="submit"
              variant="contained"
              color="primary"
            >
              Postar
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => Router.push("/")}
            >
              Cancelar
            </Button>
          </Box>

        </form>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Qual o link do Post?
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={8}
              label="Link"
              variant="outlined"
              margin="normal"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <Button
              disabled={!link}
              type="button"
              variant="contained"
              color="primary"
              onClick={generatePost}
            >
              Gerar
            </Button>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};