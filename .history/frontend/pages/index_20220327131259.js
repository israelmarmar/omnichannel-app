import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import api from '../services/api';
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import Input from '../components/Input';

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const onSubmit = async event => {
    event.preventDefault();
    console.log(email, password);
    setIsLogging(true);
    try {
      const response = await api.post('login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsLogging(false);
      router.push('profile');
    } catch (error) {
      alert('Usuário ou senha incorreta');
      setIsLogging(false);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <form onSubmit={onSubmit}>
            <Input type="text" placeholder="email" id="email" onChange={setEmail} />
            <Input type="password" placeholder="password" id="password" onChange={setPassword} />
            <button type="submit" disabled={isLogging}>{isLogging ? '...' : 'Login'}</button>
            <Link href='/resetpassword'>Esqueci a senha</Link>
          </form>
        </div>

        <Head>
          <title>OmniChannel test</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Bem-vindo ao app OmniChannel
        </h1>

          <p className={styles.description}>
            Clique no chat
        </p>

        </main>

        <footer className={styles.footer}>
          {'Codificado por  '}<a href="http://github.com/israelmarmar">@israelmarmar</a>
        </footer>
      </div>
      <script src={`${process.env.BOTPRESS_SERVER}/assets/modules/channel-web/inject.js`}></script>
      <script dangerouslySetInnerHTML={{ __html: `window.botpressWebChat.init({ host: '${process.env.BOTPRESS_SERVER}', botId: 'omnichannel' })` }} />
    </>
  )
}
