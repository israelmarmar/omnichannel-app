import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../../services/api';
import { useRouter } from 'next/router'
import Input from '../../components/Input';
import styles from '../../styles/Home.module.css'

export default function Reset() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [isReseting, setIsReseting] = useState(false);

  const onSubmit = async event => {
    event.preventDefault();
    setIsReseting(true);
    try {
      await api.post('reset', { email });
      alert('Verifique sua caixa de emails e clique em recuperar senha');
      router.push('/');
    } catch (error) {
      alert('Usuário não cadastrado');
    }
  }

  return (
    <div className={styles.container}>

      <Head>
        <title>Recuperar senha</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <form onSubmit={onSubmit}>
        <Input type="text" placeholder="email" id="email" onChange={setEmail} />
        <button type="submit" disabled={isReseting}>{isReseting ? '...' : 'Recuperar'}</button>
      </form>

      </main>

      <footer className={styles.footer}>
          {'Codificado por  '}<a href="http://github.com/israelmarmar">@israelmarmar</a>
      </footer>
    </div>
  )
}
