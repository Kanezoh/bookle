// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateUserDto } from './auth/[...nextauth]';
import clientPromise from '../../util/mongodb'
import { MongoClient } from 'mongodb';

type User = {
  id: string,
  name?: string,
  imgUrl?: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client: MongoClient = await clientPromise
  if (req.method === 'GET') {
    const db = client.db("bookle")
    const users = db.collection('users');
    const docs = await users.find().toArray()
    console.log(docs)
    res.status(200).json(docs)
  } else if (req.method === 'POST') {
    // const createUserDto = req.body as CreateUserDto 
    // const userRef = db.collection('users').doc(createUserDto.id);
    // const res = await userRef.set(createUserDto, { merge: true });
    // res.status(200)
  }
}
