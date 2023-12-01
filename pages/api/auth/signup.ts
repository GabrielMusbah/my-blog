// pages/api/auth/signup.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { name, password } = req.body;

  console.log({ name, password })

  // Verificar se o usuário já existe
  // const existingUser = await prisma.user.findUnique({
  //   where: { name },
  // });

  // if (existingUser) {
  //   return res.status(409).json({ error: 'E-mail já registrado' });
  // }

  // Criptografar a senha antes de armazenar no banco de dados
  const hashedPassword = await hash(password, 10);

  // Criar um novo usuário
  const newUser = await prisma.user.create({
    data: {
      name,
      password: hashedPassword,
    },
  });

  res.status(200).json({ message: 'Usuário criado com sucesso', user: newUser });
}
