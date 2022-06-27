import { getDoc, getDocs, collection, getFirestore } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
const { cert } = require('firebase-admin/app');
const serviceAccount = require('../../bookle-639d6-firebase-adminsdk-frk4t-3f9e157d2f.json'); // 秘密鍵を取得
const admin = require('firebase-admin');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const COLLECTION_NAME = 'users';
  //　初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }
  const db = getFirestore();
  const usersRef = collection(db, "users");

  const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  })
  res.status(200);
}