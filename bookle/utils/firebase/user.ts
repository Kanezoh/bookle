import { collection, getDocs, getFirestore } from 'firebase/firestore'

export type User = {
  id: string
}

export async function getUsers() {
  const users = new Array<User>()
  const db = getFirestore()
  const colRef = collection(db, "users");
  const usersSnapshot = await getDocs(colRef)

  usersSnapshot.docs.forEach((doc) => {
    const user = doc.data() as User
    users.push({ ...user, id: doc.id })
  })

  return users
  return null
}