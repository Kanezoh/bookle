// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateUserDto } from './auth/[...nextauth]';
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../../bookle-a4c53-b8eb155e4efa.json');


type User = {
  id: string,
  name?: string,
  imgUrl?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[]>
) {
  //　initializeAppを複数回呼び出さないようにする
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();
  if (req.method === 'GET') {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const docs: User[] = []
    snapshot.forEach((doc: any) => {
      docs.push(doc.data())
    });
    res.status(200).json(docs)
  } else if (req.method === 'POST') {
    const createUserDto = req.body as CreateUserDto 
    const userRef = db.collection('users').doc(createUserDto.id);
    const res = await userRef.set(createUserDto, { merge: true });
    res.status(200)
  }
}
