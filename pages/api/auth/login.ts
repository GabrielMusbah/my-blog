// pages/api/auth/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método não permitido
  }

  const { name, password } = req.body;

  // Validação das credenciais usando o Prisma (exemplo)
  const user = await prisma.user.findUnique({
    where: { name },
  });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Se as credenciais estiverem corretas, gerar um token JWT
  const token = sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Defina a expiração do token conforme necessário
  });

  // Armazenar o token no localStorage
  res.status(200).json({ token });
}
