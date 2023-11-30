import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import * as fs from 'fs';
import * as path from 'path';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, content, img, resume } = req.body;

  // Extrair o tipo da imagem e os dados base64
  const matches: RegExpMatchArray | null = img.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('String Base64 inválida');
  }

  const type: string = matches[1];
  const data: string = matches[2];

  // Decodificar os dados base64
  const buffer: Buffer = Buffer.from(data, 'base64');

  // Gerar um nome de arquivo único
  const fileName: string = `image_${Date.now()}.png`;

  // Caminho onde você quer salvar o arquivo
  const filePath: string = path.join(__dirname, '../../../../static/img', fileName);

  // Salvar o arquivo
  fs.writeFileSync(filePath, buffer);

  // const session = await getSession({ req });
  // if (session) {
  const result = await prisma.post.create({
    data: {
      title,
      content,
      img: fileName,
      resume,
      published: true
    },
  });

  console.log(result)

  res.json(result);
  // } else {
  //   res.status(401).send({ message: 'Unauthorized' })
  // }
}
