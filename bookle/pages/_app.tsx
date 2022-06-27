import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../utils/firebase/init'

const insertUser = async () => {
  await axios.post('/api/user');
};

function MyApp({ Component, pageProps }: AppProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    insertUser()
  }, []);

  return <Component {...pageProps} />
}

export default MyApp
