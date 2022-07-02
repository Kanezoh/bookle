// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const { cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('../../bookle-a4c53-b8eb155e4efa.json');


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //　initializeAppを複数回呼び出さないようにする
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const citiesRef = db.collection('users');
  const snapshot = await citiesRef.get();
  const docs: any[] = []
  snapshot.forEach((doc: any) => {
    console.log(doc.id, '=>', doc.data());
    docs.push(doc.data())
  });
  res.status(200).json(docs)
}
